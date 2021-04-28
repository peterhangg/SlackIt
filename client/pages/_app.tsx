import GlobalStyles from '../components/styles/globalStyles';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
