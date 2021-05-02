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
import { isAutenticated } from '../middleware/isAuthenticated';
import { Team } from '../entities/Team';
import { Channel } from '../entities/Channel';
import { CHANNEL_ADDED } from '../utils/subscriptions';

@Resolver(Channel)
export class ChannelResolver {
  // GET CHANNEL
  @Query(() => Channel)
  @UseMiddleware(isAutenticated)
  async getChannel(@Arg('channelId') channelId: number): Promise<Channel> {
    try {
      const channel = await Channel.findOne({
        relations: ['messages'],
        where: { id: channelId },
      });
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
    @Arg('description') description: string,
    @Arg('teamId') teamId: number,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Channel> {
    try {
      const team = await Team.findOne({ id: teamId });
      if (!team) throw new Error('Team cound not be found');

      const teamChannels = team?.channels.map((channel) =>
        channel.name.toLocaleLowerCase()
      );
      if (teamChannels?.includes(name.toLocaleLowerCase())) {
        throw new Error('This channel already exist in this team');
      }

      const createdChannel = await Channel.create({
        name,
        team,
        description,
      }).save();
      await pubSub.publish(CHANNEL_ADDED, createdChannel);

      return createdChannel;
    } catch (err) {
      if (err.code === '23505') {
        throw new Error('This channel already exist.');
      } else {
        throw new Error(err);
      }
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
      if (owner !== req.session.userId)
        throw new Error('Not authorized to delete this channel');

      await channel.remove();

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }

    // SUBSCRIPTION LISTENING TO NEW CHANNEL ADDED
    @Subscription(() => Channel, {
      topics: CHANNEL_ADDED,
      filter: ({ payload, args }) => args.teamId === payload.team.id,
    })
    async addedChannel(
      @Root()
      payload: Channel,
      @Arg('teamId') _: number
    ): Promise<Channel> {
      return payload;
    }
}
