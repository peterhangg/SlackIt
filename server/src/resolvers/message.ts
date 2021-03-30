import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  PubSub,
  PubSubEngine,
  Subscription,
  Root,
} from 'type-graphql';
import { MyContext } from '../types';
import { Channel } from '../entities/Channel';
import { Message } from '../entities/Message';
import { User } from '../entities/User';
import { isAutenticated } from '../middleware/isAuthenticated';
import { NEW_MESSAGE } from '../utils/subscriptions';

@Resolver()
export class MessageResolver {
  // GET CHANNEL MESSAGES
  @Query(() => [Message])
  @UseMiddleware(isAutenticated)
  async getChannelMessages(
    @Arg('channelId') channelId: number
  ): Promise<Message[]> {
    try {
      const channel = await Channel.findOne({ id: channelId });
      if (!channel) throw new Error('Channel could not be found');

      const message = await Message.find({
        relations: ['channel'],
        where: {
          channel: { id: channelId },
        },
        order: { createdAt: 'DESC' },
      });

      return message;
    } catch (err) {
      throw new Error(err);
    }
  }

  // CREATE MESSAGE
  @Mutation(() => Boolean)
  @UseMiddleware(isAutenticated)
  async createMessage(
    @Arg('text') text: string,
    @Arg('channelId') channelId: number,
    @Ctx() { req }: MyContext,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Boolean> {
    try {
      const channel = await Channel.findOne({
        where: { id: channelId },
        relations: ['team'],
      });

      if (!channel) throw new Error('channel cound not be found');

      const sender = await User.findOne({ id: req.session.userId });
      const newMessage = await Message.create({
        text,
        channel,
        user: sender,
      }).save();
      await pubsub.publish(NEW_MESSAGE, newMessage);

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
  // SUBSCRIPTION LISTENING TO NEW
  @Subscription(() => Message, {
    topics: NEW_MESSAGE,
    filter: ({ payload, args }) => args.channelId === payload.channelId,
  })
  newMessage(
    @Root()
    payload: Message,
    @Arg('channelId') _: number
  ): Message {
    return payload;
  }

  // DELETE MESSAGE
  @Mutation(() => Boolean)
  @UseMiddleware(isAutenticated)
  async deleteMessage(
    @Arg('messageId') messageId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      const message = await Message.findOne({
        relations: ['channel', 'user'],
        where: { id: messageId },
      });

      if (!message) throw new Error('Message could not be found');

      const messageOwner = message.user.id;
      if (messageOwner !== req.session.userId)
        throw new Error('Not authorized to delete this message');

      await message.remove();
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
