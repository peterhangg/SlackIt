import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities/User';

@Resolver()
export class UserResolver {
  // FETCH ALL USERS
  @Query(() => [User])
  async getAllUsers() {
    const allUsers = await User.find();
    return allUsers;
  }

  // REGISTER USER
  @Mutation(() => User)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);

    try {
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();
      
      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new Error('Username or email already exist!');
      } else {
        throw new Error('Something went wrong!');
      }
    }
  }
}
