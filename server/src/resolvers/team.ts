import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { getRepository, ILike } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import argon2 from 'argon2';
import { MyContext } from '../utils/types';
import { User } from '../entities/User';
import { Team } from '../entities/Team';
import { isAutenticated } from '../middleware/isAuthenticated';
import { Channel } from '../entities/Channel';
import {
  JOIN_TEAM,
  LEAVE_TEAM,
  TEAM_NOTIFICATION,
} from '../utils/subscriptions';
import { Message } from '../entities/Message';

@Resolver(Team)
export class TeamResolver {
  // GET ALL TEAMS
  @Query(() => [Team])
  async getAllTeams(
    @Arg('searchTeam', { nullable: true }) searchTeam: string
  ): Promise<Team[]> {
    try {
      const searchData = searchTeam ? { name: ILike(`${searchTeam}%`) } : {};
      const allTeams = await Team.find(searchData);

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

  // GET TEAM USERS
  @Query(() => [User])
  @UseMiddleware(isAutenticated)
  async getTeamUsers(
    @Arg('teamId') teamId: number,
    @Arg('searchMember', { nullable: true }) searchMember: string
  ): Promise<User[]> {
    try {
      const team = await Team.findOne({
        relations: ['users'],
        where: { id: teamId },
      });
      if (!team) throw new Error('This team could not be found');

      const sortedTeamUsers = team.users.sort((a, b) =>
        a.username.localeCompare(b.username)
      );

      const regex = new RegExp(`^${searchMember}.*`, 'i');
      const filterUsers = sortedTeamUsers.filter((user) =>
        regex.test(user.username)
      );

      return searchMember ? filterUsers : sortedTeamUsers;
    } catch (err) {
      throw new Error(err);
    }
  }

  // CREATE TEAM
  @Mutation(() => Team)
  @UseMiddleware(isAutenticated)
  async createTeam(
    @Arg('name') name: string,
    @Arg('description') description: string,
    @Ctx() { req }: MyContext
  ): Promise<Team> {
    try {
      const owner = await User.findOne({ id: req.session.userId });
      if (!owner) throw new Error('User cound not be found');

      const teams = await Team.find({});
      const allTeams = teams?.map((team) => team.name.toLocaleLowerCase());
      if (allTeams.includes(name.toLocaleLowerCase())) {
        throw new Error('This team already exist.');
      }

      const teamBot = await User.create({
        username: `SlackIt Bot`,
        email: `${uuidv4()}@slackit.com`,
        password: await argon2.hash(uuidv4()),
      }).save();

      const newTeam = await Team.create({
        name: name,
        owner,
        description,
        users: [owner, teamBot],
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
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
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

      const teamBot = await User.findOne({
        where: {
          username: 'SlackIt Bot',
        },
      });

      const userJoinedNotification = await Message.create({
        text: `${user.username} has join the team.`,
        channel: team.channels[0],
        user: teamBot,
      }).save();

      pubSub.publish(TEAM_NOTIFICATION, userJoinedNotification);
      pubSub.publish(JOIN_TEAM, { user, teamId });
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

  // LEAVE TEAM
  @Mutation(() => Boolean)
  @UseMiddleware(isAutenticated)
  async leaveTeam(
    @Arg('teamId') teamId: number,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    try {
      const user = await User.findOne({ id: req.session.userId });
      if (!user) throw new Error('User could not be found');

      const team = await Team.findOne({ id: teamId });
      if (!team) throw new Error('Team could not be found');
      console.log(team.channels[0]);

      const teamMember = team.users.some((teamUser) => teamUser.id === user.id);
      if (!teamMember) throw new Error('You are not a member of this team');

      team.users = team.users.filter((teamUser) => teamUser.id !== user.id);
      await team.save();

      const teamBot = await User.findOne({
        where: {
          username: 'SlackIt Bot',
        },
      });

      const leftMemberNotification = await Message.create({
        text: `${user.username} has left the team.`,
        channel: team.channels[0],
        user: teamBot,
      }).save();

      pubSub.publish(LEAVE_TEAM, { user, teamId });
      pubSub.publish(TEAM_NOTIFICATION, leftMemberNotification);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }

  // SUBSCRIPTION LISTENING TO NEW USER JOINING TEAM
  @Subscription(() => User, {
    topics: JOIN_TEAM,
    filter: ({ payload, args }) => args.teamId === payload.teamId,
  })
  async joinedTeam(
    @Root()
    payload: any,
    @Arg('teamId') _: number
  ): Promise<User> {
    return payload.user;
  }

  // SUBSCRIPTION LISTENING TO USER LEAVE TEAM
  @Subscription(() => User, {
    topics: LEAVE_TEAM,
    filter: ({ payload, args }) => args.teamId === payload.teamId,
  })
  async leftTeam(
    @Root()
    payload: any,
    @Arg('teamId') _: number
  ): Promise<User> {
    return payload.user;
  }
}
