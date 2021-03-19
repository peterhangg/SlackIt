import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities/User';
import { validateRegister } from '../utils/validateRegister';

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
    validateRegister(email, username, password);

    try {
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();

      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new Error("username already exist!");
      } else {
        throw new Error("Something went wrong!");
      }
    }
  }

  // LOGIN
  @Mutation(() => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Either the password or email address is incorrect.');
    }

    const validatePassword = await argon2.verify(user.password, password);
    if (!validatePassword) {
      throw new Error('Either the password or email address is incorrect.');
    }
    return user;
  }
}
