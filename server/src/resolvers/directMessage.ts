import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Subscription,
  PubSub,
  PubSubEngine,
  Root,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { MyContext, Upload } from '../types';
import { User } from '../entities/User';
import { isAutenticated } from '../middleware/isAuthenticated';
import { DirectMessage } from '../entities/DirectMessage';
import { GraphQLUpload } from 'apollo-server-express';
import { uploadCloudinary } from '../config/cloudinary';
import {
  DELETE_DIRECT_MESSAGE,
  EDIT_DIRECT_MESSAGE,
  NEW_DIRECT_MESSAGE,
} from '../utils/subscriptions';

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
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<DirectMessage> {
    try {
      let uploadedImage;
      const creator = await User.findOne({ id: req.session.userId });

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

      await pubSub.publish(NEW_DIRECT_MESSAGE, directMessage);
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
  ): Promise<DirectMessage[]> {
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
  async directMessageUsers(
    @Arg('teamId') teamId: number,
    @Ctx() { req }: MyContext
  ): Promise<User[]> {
    try {
      const directMessageUsers = getConnection().query(
        `
          select distinct on (u.id) u.id, u.username from direct_message dm
          join "user" u on (dm."receiverId" = u.id) 
          or (dm."senderId" = u.id) 
          where (dm."receiverId" = $1 or dm."senderId" = $1)
          and dm."teamId" = $2 and u.id != $1 
        `,
        [req.session.userId, teamId]
      );

      return directMessageUsers;
    } catch (err) {
      throw new Error(err);
    }
  }

  // DELETE DIRECT MESSAGE
  @Mutation(() => Boolean)
  @UseMiddleware(isAutenticated)
  async deleteDirectMessage(
    @Arg('directMessageId') messageId: number,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    try {
      const directMessage = await DirectMessage.findOne({
        relations: ['creator'],
        where: { id: messageId },
      });

      if (!directMessage) throw new Error('Direct message could not be found');

      const directMessageOwner = directMessage.creator.id;

      if (directMessageOwner !== req.session.userId)
        throw new Error('Not authorized to delete this direct message');

      await pubSub.publish(DELETE_DIRECT_MESSAGE, directMessage);
      await directMessage.remove();
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }

  // EDIT DIRECT MESSAGE
  @Mutation(() => DirectMessage)
  @UseMiddleware(isAutenticated)
  async editDirectMessage(
    @Arg('directMessageId') directMessageId: number,
    @Arg('text') text: string,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<DirectMessage> {
    try {
      const directMessage = await DirectMessage.findOne({
        relations: ['creator'],
        where: { id: directMessageId },
      });

      if (!directMessage) throw new Error('Message could not be found');

      const messageOwner = directMessage.creator.id;
      if (messageOwner !== req.session.userId)
        throw new Error('Not authorized to edit this message');

      directMessage.text = text;

      await directMessage.save();
      console.log(directMessage);
      await pubSub.publish(EDIT_DIRECT_MESSAGE, directMessage);
      return directMessage;
    } catch (err) {
      throw new Error(err);
    }
  }

  // SUBSCRIPTION LISTENING TO NEW MESSAGE
  @Subscription(() => DirectMessage, {
    topics: NEW_DIRECT_MESSAGE,
    filter: ({ payload, args }) =>
      args.teamId === payload.teamId &&
      (args.userId == payload.receiverId || args.userId == payload.senderId),
  })
  async newDirectMessage(
    @Root()
    payload: DirectMessage,
    @Arg('userId') _userId: number,
    @Arg('teamId') _teamId: number
  ): Promise<DirectMessage> {
    return payload;
  }

  // SUBSCRIPTION DELETE DIRECT MESSAGE
  @Subscription(() => DirectMessage, {
    topics: DELETE_DIRECT_MESSAGE,
    filter: ({ payload, args }) =>
      args.teamId === payload.teamId &&
      (args.userId == payload.receiverId || args.userId == payload.senderId),
  })
  async removeDirectMessage(
    @Root()
    payload: DirectMessage,
    @Arg('userId') _userId: number,
    @Arg('teamId') _teamId: number
  ): Promise<DirectMessage> {
    return payload;
  }

  // SUBSCRIPTION DELETE DIRECT MESSAGE
  @Subscription(() => DirectMessage, {
    topics: EDIT_DIRECT_MESSAGE,
    filter: ({ payload, args }) =>
      args.teamId === payload.teamId &&
      (args.userId == payload.receiverId || args.userId == payload.senderId),
  })
  async editedDirectMessage(
    @Root()
    payload: DirectMessage,
    @Arg('userId') _userId: number,
    @Arg('teamId') _teamId: number
  ): Promise<DirectMessage> {
    return payload;
  }
}
