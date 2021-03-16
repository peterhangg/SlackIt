import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';
import { User } from './entities/User';
import path from 'path';

const main = async () => {
  const options: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User],
  };

  const dbConnection = await createConnection(options);

  // dbConnection
  //   .createQueryBuilder()
  //   .insert()
  //   .into(User)
  //   .values({
  //     username: 'peter',
  //     email: 'peter@example.com',
  //     password: 'peter',
  //   })
  //   .execute();

  console.log('IS DB CONNECTED?: ', dbConnection.isConnected);
};

main().catch((err) => {
  console.error(err);
});
