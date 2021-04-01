import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { onError } from 'apollo-link-error';

export default function createApolloClient(initialState: {}, ctx: any) {
  let link, httpLink, wsLink;

  const ssrMode = typeof window === 'undefined';

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

  httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: 'include',
  });

  if (ssrMode) {
    return new ApolloClient({
      ssrMode,
      link: errorLink.concat(httpLink),
      credentials: 'include',
      headers: {
        cookie:
          (typeof window === 'undefined'
            ? ctx && ctx.req?.headers.cookie
            : undefined) || '',
      },
      cache: new InMemoryCache().restore(initialState),
      connectToDevTools: true,
    });
  } else {
    // CLIENT
    const client = new SubscriptionClient(
      process.env.NEXT_PUBLIC_WS_URL as string,
      {
        reconnect: true,
      }
    );
    wsLink = new WebSocketLink(client);

    link = process.browser
      ? split(
          //only create the split in the browser
          // split based on operation type
          ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return (
              kind === 'OperationDefinition' && operation === 'subscription'
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;

    return new ApolloClient({
      ssrMode,
      link: errorLink.concat(link),
      headers: {
        cookie:
          (typeof window === 'undefined'
            ? ctx && ctx?.req?.headers.cookie
            : undefined) || '',
      },
      credentials: 'include',
      cache: new InMemoryCache().restore(initialState),
      connectToDevTools: true,
    });
  }
}
