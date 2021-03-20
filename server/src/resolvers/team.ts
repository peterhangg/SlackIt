import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities/User';
import { Team } from '../entities/Team';
import { isAutenticated } from '../middleware/isAuthenticated';

@Resolver(Team)
export class TeamResolver {
  // CREATE TEAM
  @Mutation(() => Team)
  @UseMiddleware(isAutenticated)
  async createTeam(
    @Arg('name') name: string,
    @Ctx() { req }: MyContext
  ): Promise<Team> {
    try {
      const owner = await User.findOne({ id: req.session.userId });
      if (!owner) throw new Error('User cound not be found');
      // TODO: CHECK IF WE NEED TO ADD THE USERS TO CHANNEL -> await Team.create({ name, owner, users: [owner] }).save();
      const newTeam = await Team.create({ name, owner, users: [owner] }).save();
      console.log('TEAM CREATED:', newTeam);
      return newTeam;
    } catch (err) {
      throw new Error('Something went wrong during creating team');
    }
  }
}
