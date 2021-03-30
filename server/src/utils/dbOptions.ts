import path from "path";
import { ConnectionOptions } from 'typeorm';
import { Channel } from "../entities/Channel";
import { Message } from "../entities/Message";
import { Team } from "../entities/Team";
import { User } from "../entities/User";

export const dbOptions: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  migrations: [path.join(__dirname, './migrations/*')],
  entities: [User, Message, Channel, Team],
};