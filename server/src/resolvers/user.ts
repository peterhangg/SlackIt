import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities/User';
import { validateRegister } from '../utils/validateRegister';
import { UserResponse } from '../utils/types';

@Resolver()
export class UserResolver {
  // FETCH ALL USERS
  @Query(() => [User])
  async getAllUsers() {
    const allUsers = await User.find();
    return allUsers;
  }

  // REGISTER USER
  @Mutation(() => UserResponse)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(password);
    const errors = validateRegister(email, username, password);

    if (errors) {
      return { errors };
    }

    try {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();

      return { user };
    } catch (err) {
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already exist!',
            },
          ],
        };
      } else {
        return {
          errors: [
            {
              field: '',
              message: 'Something went wrong!',
            },
          ],
        };
      }
    }
  }

  // LOGIN
  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Either this password or email address is incorrect.',
          },
        ],
      };
    }

    const validatePassword = await argon2.verify(user.password, password);

    if (!validatePassword) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Either this password or email address is incorrect.',
          },
        ],
      };
    }

    return { user };
  }
}
