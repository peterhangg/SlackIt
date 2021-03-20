import { ApolloProvider } from '@apollo/client';

export default function MyApp({ Component, pageProps }: any) {
  return (
      <Component {...pageProps} />
  )
}