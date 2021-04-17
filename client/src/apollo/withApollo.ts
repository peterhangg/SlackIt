import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { NextPageContext } from 'next';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import createWithApollo from './createWithApollo';

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  credentials: 'include',
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri:  process.env.NEXT_PUBLIC_WS_URL as string,
      options: {
        reconnect: true,
        lazy: true,
      },
    })
  : null;


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

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

  const link = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation }: any = getMainDefinition(query);
          return (
            kind === 'OperationDefinition' && operation === 'subscription'
          );
        },
        wsLink,
        linkWithAuth
      )
    : linkWithAuth;

  return new ApolloClient({
    link: errorLink.concat(link as any),
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(createApolloClient as any);
