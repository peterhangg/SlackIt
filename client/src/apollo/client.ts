import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createWithApollo } from './createWithApollo';
import { NextPageContext } from 'next';

const client = (ctx: NextPageContext) => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined' ? ctx.req?.headers.cookie : undefined) ||
        '',
    },
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(client as any);
