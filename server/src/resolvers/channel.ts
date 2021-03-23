import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { MyContext } from '../types';
import { isAutenticated } from '../middleware/isAuthenticated';
import { Team } from '../entities/Team';
import { Channel } from '../entities/Channel';

@Resolver()
export class ChannelResolver {
  // GET CHANNEL
  @Query(() => Channel)
  @UseMiddleware(isAutenticated)
  async getChannel(@Arg('channelId') channelId: number): Promise<Channel> {
    try {
      const channel = await Channel.findOne({ id: channelId });
      if (!channel) throw new Error('Channel could not be found');

      return channel;
    } catch (err) {
      throw new Error(err);
    }
  }

  // GET TEAM's CHANNELS
  @Query(() => [Channel])
  @UseMiddleware(isAutenticated)
  async getTeamChannels(@Arg('teamId') teamId: number): Promise<Channel[]> {
    try {
      const team = await Team.findOne({ id: teamId });
      if (!team) throw new Error('Team could not be found');

      return team.channels;
    } catch (err) {
      throw new Error(err);
    }
  }

  // CREATE CHANNEL
  @Mutation(() => Channel)
  @UseMiddleware(isAutenticated)
  async createChannel(
    @Arg('name') name: string,
    @Arg('teamId') teamId: number
  ): Promise<Channel> {
    try {
      const team = await Team.findOne({ id: teamId });
      if (!team) throw new Error('Team cound not be found');

      const createdChannel = await Channel.create({ name, team }).save();
      // team.channels = [...team.channels, createdChannel];

      return createdChannel;
    } catch (err) {
      throw new Error(err);
    }
  }

  // DELETE CHANNEL
  @Mutation(() => Boolean)
  @UseMiddleware(isAutenticated)
  async deleteChannel(
    @Arg('channelId') channelId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      const channel = await Channel.findOne({
        where: { id: channelId },
        relations: ['team'],
      });
      if (!channel) throw new Error('Channel could not be found');
      
      const owner = channel?.team.owner.id;
      if (owner !== req.session.userId) throw new Error('Not authorized to delete this channel');
      
      await channel.remove();

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
