import argon2 from 'argon2';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { MyContext, Upload } from '../types';
import { User } from '../entities/User';
import { validateRegister } from '../utils/validateRegister';
import { COOKIE_NAME } from '../utils/constants';
import { isAutenticated } from '../middleware/isAuthenticated';
import { uploadCloudinary } from '../config/cloudinary';

@Resolver()
export class UserResolver {
  // GET USER
  @Query(() => User)
  async getUser(@Arg('userId') userId: number): Promise<User> {
    try {
      const user = await User.findOne(userId);
      if (!user) throw new Error('This user does not exist');

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  // GET ALL USERS
  @Query(() => [User])
  async getAllUsers() {
    const allUsers = await User.find();
    return allUsers;
  }

  // GET CURRENT USER
  @Query(() => User, { nullable: true })
  async getMe(@Ctx() { req }: MyContext): Promise<User | null> {
    try {
      if (!req.session.userId) {
        return null;
      }

      const user = await User.findOne({
        relations: ['teams', 'messages'],
        where: { id: req.session.userId },
      });

      if (!user) throw new Error('User could not be found');

      return user;
    } catch (err) {
      throw new Error(err);
    }
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

      if (newUser) {
        req.session.userId = newUser.id;
      }
      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new Error('username already exist!');
      } else {
        throw new Error('Something went wrong!');
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

    req.session.userId = user.id;
    return user;
  }

  // LOGOUT
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  // EDIT USER
  @Mutation(() => User)
  @UseMiddleware(isAutenticated)
  async editUser(
    @Arg('username') username: string,
    @Arg('currentPassword') currentPassword: string,
    @Arg('newPassword', { nullable: true }) newPassword: string,
    @Arg('image', () => GraphQLUpload as any, { nullable: true }) image: Upload,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    try {
      const user = await User.findOne({ id: req.session.userId });
      if (!user) throw new Error('User does not exist');

      const validatePassword = await argon2.verify(
        user.password,
        currentPassword
      );
      if (!validatePassword) throw new Error('Invlid credentials');

      if (username) {
        user.username = username;
      }
      
      if (newPassword) {
        const hashedPassword = await argon2.hash(newPassword);
        user.password = hashedPassword;
      }

      if (image) {
        const newAvatar = await uploadCloudinary(image);
        if (!newAvatar) {
          throw new Error('Avatar not uploaded');
        }
        user.avatar = newAvatar;
      }

      return user.save();
    } catch (err) {
      throw new Error(err);
    }
  }
}
