import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities/User';
import { isAutenticated } from '../middleware/isAuthenticated';
import { DirectMessage } from '../entities/DirectMessage';

@Resolver()
export class DirectMessageResolver {
  // CREATE DIRECT MESSAGE
  @UseMiddleware(isAutenticated)
  @Mutation(() => DirectMessage)
  async createDirectMessage(
    @Arg('text') text: string,
    @Arg('teamId') teamId: number,
    @Arg('receiverId') receiverId: number,
    @Ctx() { req }: MyContext
  ): Promise<DirectMessage> {
    try {
      if (receiverId === req.session.userId)
        throw new Error('Cannot send direct message to yourself.');

      const creator = await User.findOne({ id: req.session.userId });

      const directMessage = await DirectMessage.create({
        text,
        receiverId,
        senderId: req.session.userId,
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
}
