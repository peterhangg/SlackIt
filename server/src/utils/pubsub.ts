import { RedisPubSub } from 'graphql-redis-subscriptions';

export const redisPubSub = new RedisPubSub({
  connection: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    retryStrategy: (times: number) => {
      return Math.min(times * 50, 2000);
    },
  },
});
