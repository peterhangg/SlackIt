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
import {
  TEAM_NOTIFICATION,
  NEW_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
} from '../utils/subscriptions';
import { LessThan } from 'typeorm';
import { PaginatedMessages } from '../utils/types';
import { uploadCloudinary } from '../config/cloudinary';
import { Stream } from 'stream';
export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
@Resolver()
export class MessageResolver {
  // GET CHANNEL MESSAGES
  @Query(() => PaginatedMessages)
  @UseMiddleware(isAutenticated)
  async getChannelMessages(
    @Arg('channelId') channelId: number,
    @Arg('limit') limit: number,
    @Arg('cursor', { nullable: true }) cursor: string
  ): Promise<PaginatedMessages> {
    try {
      const channel = await Channel.findOne({ id: channelId });
      if (!channel) throw new Error('Channel could not be found');

      const pagLimit = Math.min(25, limit);
      const pagLimitPlusOne = pagLimit + 1;

      const messages: Message[] = await Message.find({
        relations: ['channel'],
        where: cursor
          ? {
              channel: { id: channelId },
              createdAt: LessThan(new Date(parseInt(cursor))),
            }
          : {
              channel: { id: channelId },
            },
        order: { createdAt: 'DESC' },
        take: pagLimitPlusOne,
      });

      return {
        messages: messages.slice(0, pagLimit),
        hasMore: messages.length === pagLimitPlusOne,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  // CREATE MESSAGE
  @Mutation(() => Boolean)
  @UseMiddleware(isAutenticated)
  async createMessage(
    @Arg('text') text: string,
    @Arg('image', { nullable: true }) image: string,
    @Arg('channelId') channelId: number,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Boolean> {
    try {
      let uploadedImage;
      const channel = await Channel.findOne({
        where: { id: channelId },
        relations: ['team'],
      });

      if (!channel) throw new Error('channel cound not be found');

      if (image) {
        const newImage: any = await uploadCloudinary(image);
        if (!newImage) {
          throw new Error('Images not uploaded');
        }
        uploadedImage = newImage;
      }

      const sender = await User.findOne({ id: req.session.userId });
      const newMessage = await Message.create({
        text,
        channel,
        image: uploadedImage || '',
        user: sender,
      }).save();

      await pubSub.publish(NEW_MESSAGE, newMessage);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }

  // DELETE MESSAGE
  @Mutation(() => Boolean)
  @UseMiddleware(isAutenticated)
  async deleteMessage(
    @Arg('messageId') messageId: number,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
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

      await pubSub.publish(DELETE_MESSAGE, message);
      await message.remove();
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }

  // EDIT MESSAGE
  @Mutation(() => Message)
  @UseMiddleware(isAutenticated)
  async editMessage(
    @Arg('messageId') messageId: number,
    @Arg('text') text: string,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Message> {
    try {
      const message = await Message.findOne({
        relations: ['channel', 'user'],
        where: { id: messageId },
      });

      if (!message) throw new Error('Message could not be found');

      const messageOwner = message.user.id;
      if (messageOwner !== req.session.userId)
        throw new Error('Not authorized to delete this message');

      message.text = text;

      await message.save();
      await pubSub.publish(EDIT_MESSAGE, message);
      return message;
    } catch (err) {
      throw new Error(err);
    }
  }
  // SUBSCRIPTION LISTENING TO NEW MESSAGE
  @Subscription(() => Message, {
    topics: NEW_MESSAGE,
    filter: ({ payload, args }) => args.channelId === payload.channel.id,
  })
  async newMessage(
    @Root()
    payload: Message,
    @Arg('channelId') _: number
  ): Promise<Message> {
    return payload;
  }

  // SUBSCRIPTION LISTENING TO NEW MESSAGE
  @Subscription(() => Message, {
    topics: DELETE_MESSAGE,
    filter: ({ payload, args }) => args.channelId === payload.channel.id,
  })
  async removeMessage(
    @Root()
    payload: Message,
    @Arg('channelId') _: number
  ): Promise<Message> {
    return payload;
  }

  // SUBSCRIPTION LISTENING TO EDITED MESSAGE
  @Subscription(() => Message, {
    topics: EDIT_MESSAGE,
    filter: ({ payload, args }) => args.channelId === payload.channel.id,
  })
  async editedMessage(
    @Root()
    payload: Message,
    @Arg('channelId') _: number
  ): Promise<Message> {
    return payload;
  }

  // SUBSCRIPTION MEMBER LEAVE/JOIN TEAM NOTIFICATION
  @Subscription(() => Message, {
    topics: TEAM_NOTIFICATION,
    filter: ({ payload, args }) => args.channelId === payload.channel.id,
  })
  async teamNotification(
    @Root()
    payload: Message,
    @Arg('channelId') _: number
  ): Promise<Message> {
    return payload;
  }
}
