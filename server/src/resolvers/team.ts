import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities/User';
import { Team } from '../entities/Team';

@Resolver()
export class TeamResolver {
  // CREATE TEAM
  @Mutation(() => Boolean)
  async createTeam(
    @Arg('name') name: string,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    try {
      // TODO: PASS THE USER IN CONTEXT FOR OWNER
      const owner = await User.findOne({ id: 1 });
      if (!owner) throw new Error('Owner cound not be found');

      await Team.create({ name, owner }).save();
      return true;
    } catch (err) {
      return false;
    }
  }
}
