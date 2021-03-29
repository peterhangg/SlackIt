import GlobalStyles from '../styles/globalStyles';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
