import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../types';
import { Team } from '../entities/Team';
import { Channel } from '../entities/Channel';

@Resolver()
export class ChannelResolver {
  // CREATE CHANNEL
  @Mutation(() => Boolean)
  async createChannel(
    @Arg('name') name: string,
    @Arg('teamId') teamId: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    try {
      // TODO: PASS THE TEAM IN CONTEXT FOR CHANNEL
      const team = await Team.findOne({ id: teamId });
      if (!team) throw new Error('Team cound not be found');

      await Channel.create({ name, team }).save();
      return true;
    } catch (err) {
      return false;
    }
  }
}
