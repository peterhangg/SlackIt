import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { NextPageContext } from 'next';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { errorLink } from '../utils/errorLink';
import createWithApollo from './createWithApollo';

const apiURI =
  process.env.NEXT_PUBLIC_PROD === 'false'
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_URL;

const wsURI =
  process.env.NEXT_PUBLIC_PROD === 'false'
    ? process.env.NEXT_PUBLIC_WS_DEV_URL
    : process.env.NEXT_PUBLIC_WS_URL;

const uploadLink = createUploadLink({
  uri: apiURI as string,
  credentials: 'include',
});

const wsLink = (process as any).browser
  ? new WebSocketLink({
      uri: wsURI as string,
      options: {
        reconnect: true,
        lazy: true,
      },
    })
  : null;

const createApolloClient = (ctx: NextPageContext) => {
  const authLink = setContext((_, { headers }) => ({
    credentials: 'include',
    headers: {
      ...headers,
      cookie:
        typeof window === 'undefined' ? ctx?.req?.headers.cookie : undefined,
    },
  }));

  const linkWithAuth = authLink.concat(uploadLink as any);

  const link = (process as any).browser
    ? split(
        ({ query }) => {
          const { kind, operation }: any = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink as any,
        linkWithAuth as any
      )
    : linkWithAuth;

  return new ApolloClient({
    link: errorLink.concat(link as any) as any,
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(createApolloClient as any);
