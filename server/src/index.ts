import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'typeorm';
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { createServer } from 'http';
import { getSchema } from './utils/schema';
import { COOKIE_NAME, NODE_ENV } from './utils/constants';
import { dbOptions } from './config/dbConfig';
import { graphqlUploadExpress } from 'graphql-upload';

const main = async () => {
  await createConnection(dbOptions);
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

  const sessionMiddleware = session({
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
  });

  app.use(sessionMiddleware);

  const schema = await getSchema();
  const apolloServer = new ApolloServer({
    schema,
    uploads: false,
    introspection: true,
    playground: true,
    context: ({ req, res }) => ({ req, res, redis }),
    subscriptions: {
      onConnect: () => console.log("ws connected!"),
      onDisconnect: () => console.log('ws disconnected'),
    },
  });

  app.use(graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 10 }));
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const ws = createServer(app);
  apolloServer.installSubscriptionHandlers(ws);

  ws.listen(parseInt(process.env.PORT), () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}/graphql`
    );
  });
};

main().catch((err) => {
  console.error(err);
});
