import { MyContext } from '../types';
import { MiddlewareFn } from 'type-graphql';

export const isAutenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('Not authenticated');
  }
  return next();
};
