import { ApolloProvider } from '@apollo/client';
import client from '../src/apollo/client';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}