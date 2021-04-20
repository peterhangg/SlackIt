import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { MyContext, Upload } from '../types';
import { User } from '../entities/User';
import { isAutenticated } from '../middleware/isAuthenticated';
import { DirectMessage } from '../entities/DirectMessage';
import { GraphQLUpload } from 'apollo-server-express';
import { uploadCloudinary } from '../config/cloudinary';
import { getConnection } from 'typeorm';

@Resolver()
export class DirectMessageResolver {
  // CREATE DIRECT MESSAGE
  @UseMiddleware(isAutenticated)
  @Mutation(() => DirectMessage)
  async createDirectMessage(
    @Arg('text') text: string,
    @Arg('teamId') teamId: number,
    @Arg('receiverId') receiverId: number,
    @Arg('image', () => GraphQLUpload as any, { nullable: true }) image: Upload,
    @Ctx() { req }: MyContext
  ): Promise<DirectMessage> {
    try {
      const creator = await User.findOne({ id: req.session.userId });
      let uploadedImage;

      if (image) {
        const newImage: any = await uploadCloudinary(image);

        if (!newImage) {
          throw new Error('Image not uploaded');
        }

        uploadedImage = newImage;
      }

      const directMessage = await DirectMessage.create({
        text,
        receiverId,
        senderId: req.session.userId,
        image: uploadedImage || '',
        teamId,
        creator,
      }).save();

      return directMessage;
    } catch (err) {
      throw new Error(err);
    }
  }

  // GET DIRECT MESSAGES
  @Query(() => [DirectMessage])
  @UseMiddleware(isAutenticated)
  async getDirectMessages(
    @Arg('teamId') teamId: number,
    @Arg('receiverId') receiverId: number,
    @Ctx() { req }: MyContext
  ): Promise<DirectMessage[] | null> {
    try {
      const directMessages: DirectMessage[] = await DirectMessage.find({
        relations: ['creator'],
        where: [
          { receiverId, teamId, senderId: req.session.userId },
          { receiverId: req.session.userId, teamId, senderId: receiverId },
        ],
        order: { createdAt: 'ASC' },
      });

      return directMessages;
    } catch (err) {
      throw new Error(err);
    }
  }

  // GET DIRECT MESSAGE USERS
  @Query(() => [User], { nullable: true })
  @UseMiddleware(isAutenticated)
  async getDirectMessageUsers(
    @Arg('teamId') teamId: number,
    @Ctx() { req }: MyContext
  ): Promise<User[]> {
    try {
      const directMessageUsers = getConnection().query(
        `
          select distinct on (u.id) u.id, u.username from direct_message dm
          join "user" u on (dm."receiverId" = u.id) or 
          (dm."senderId" = u.id) where (dm."receiverId" = $1 or dm."senderId" = $1)
          and dm."teamId" = $2
        `,
        [req.session.userId, teamId]
      );

      return directMessageUsers;
    } catch (err) {
      throw new Error(err);
    }
  }
}
