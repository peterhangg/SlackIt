import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../types';
import { Channel } from '../entities/Channel';
import { Message } from '../entities/Message';
import { User } from '../entities/User';

@Resolver()
export class MessageResolver {
  // CREATE MESSAGE
  @Mutation(() => Boolean)
  async createMessage(
    @Arg('text') text: string,
    @Arg('channelId') channelId: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    try {
      // TODO: PASS THE TEAM AND USER IN CONTEXT FOR MESSAGE
      const channel = await Channel.findOne({
        where: { id: channelId }, 
        relations: ["team"]
      });
      console.log(channel);
      if (!channel) throw new Error('channel cound not be found');
      
      const sender = await User.findOne({ id: 1 });

      await Message.create({ text, channel, user: sender }).save();
      return true;
    } catch (err) {
      return false;
    }
  }
}
