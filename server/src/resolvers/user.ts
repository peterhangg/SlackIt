
import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
} from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities/User';

@Resolver()
export class UserResolver {
  // REGISTER USER
  @Mutation(() => User)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    let newUser;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username,
          email,
          password: hashedPassword,
        })
        .returning('*')
        .execute();

      newUser = result.raw[0];
    } catch (err) {
      if (err.code === '23505') {
        throw new Error('Username or email already exist!');
      } else {
        throw new Error('Something went wrong!');
      }
    }

    return newUser;
  }
}