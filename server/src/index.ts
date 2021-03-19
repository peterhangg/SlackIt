import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { createConnection, ConnectionOptions } from 'typeorm';
import path from 'path';
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { User } from './entities/User';
import { getSchema } from './utils/schema';
import { Message } from './entities/Message';
import { Channel } from './entities/Channel';
import { Team } from './entities/Team';
import { COOKIE_NAME, NODE_ENV } from './utils/constants';

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
    entities: [User, Message, Channel, Team],
  };

  const dbConnection = await createConnection(options);
  console.log('IS DB CONNECTED?: ', dbConnection.isConnected);

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.get('/', (_: Request, res: Response) => {
    res.send('SERVER IS RUNNING!');
    res.end();
  });

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 6 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
        secure: NODE_ENV,
        domain: undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const schema = await getSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}/graphql`
    );
  });
};

main().catch((err) => {
  console.error(err);
});
