import type { AppProps } from 'next/app';

import '../styles/globals.less';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
