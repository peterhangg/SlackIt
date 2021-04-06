import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getRepository } from 'typeorm';
import { MyContext } from '../types';
import { User } from '../entities/User';
import { Team } from '../entities/Team';
import { isAutenticated } from '../middleware/isAuthenticated';
import { Channel } from '../entities/Channel';

@Resolver(Team)
export class TeamResolver {
  // GET ALL TEAMS
  @Query(() => [Team])
  @UseMiddleware(isAutenticated)
  async getAllTeams(): Promise<Team[]> {
    try {
      const allTeams = await Team.find({});
      if (!allTeams) throw new Error('No teams currently exist');

      return allTeams;
    } catch (err) {
      throw new Error(err);
    }
  }

  // GET TEAM
  @Query(() => Team)
  @UseMiddleware(isAutenticated)
  async getTeam(@Arg('teamId') teamId: number): Promise<Team> {
    try {
      const team = await Team.findOne({ id: teamId });
      if (!team) throw new Error('This team could not be found');

      return team;
    } catch (err) {
      throw new Error(err);
    }
  }

  // GET USER"S TEAMS
  @Query(() => [Team])
  @UseMiddleware(isAutenticated)
  async getUserTeams(@Ctx() { req }: MyContext): Promise<Team[]> {
    try {
      const userTeams = await getRepository(Team)
        .createQueryBuilder('team')
        .leftJoinAndSelect('team.owner', 'owner')
        .leftJoinAndSelect('team.users', 'users')
        .leftJoinAndSelect('team.channels', 'channel')
        .innerJoin('team.users', 'user')
        .where('user.id = :id', { id: req.session.userId })
        .getMany();

      return userTeams;
    } catch (error) {
      throw new Error(error);
    }
  }

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

      const newTeam = await Team.create({
        name,
        owner,
        users: [owner],
      }).save();

      const generalChannel = await Channel.create({
        name: 'general',
        description:
          'This channel is for team-wide communication and announcements.',
        team: newTeam,
      }).save();

      const randomChannel = await Channel.create({
        name: 'random',
        description:
          "A place for non-work banter, links, articles of interest, humor or anything else which you'd like concentrated in some place other than work-related channels..",
        team: newTeam,
      }).save();

      newTeam.channels = [generalChannel, randomChannel];

      return newTeam;
    } catch (err) {
      if (err.code === '23505') {
        throw new Error('This team already exist.');
      } else {
        throw new Error(err);
      }
    }
  }

  // JOIN TEAM
  @Mutation(() => Team)
  @UseMiddleware(isAutenticated)
  async joinTeam(
    @Arg('teamId') teamId: number,
    @Ctx() { req }: MyContext
  ): Promise<Team> {
    try {
      const team = await Team.findOne({ id: teamId });
      if (!team) throw new Error('Team could not be found');

      const user = await User.findOne({ id: req.session.userId });
      if (!user) throw new Error('User could not be found');

      const userIds = team.users.map((user) => user.id);
      const checkIfJoined = userIds.indexOf(user.id);

      if (checkIfJoined !== -1) {
        throw new Error('You already joined this team');
      }

      team.users = [...team.users, user];
      const joinedTeam = await team.save();

      return joinedTeam;
    } catch (err) {
      throw new Error(err);
    }
  }

  // DELETE TEAM
  @Mutation(() => Boolean)
  @UseMiddleware(isAutenticated)
  async deleteTeam(
    @Arg('teamId') teamId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      const team = await Team.findOne({ id: teamId });
      if (!team) throw new Error('Team could not be found');

      const owner = team.owner.id;

      if (owner !== req.session.userId)
        throw new Error('Only the owner can delete this team');

      await team.remove();
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
