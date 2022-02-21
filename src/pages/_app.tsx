import { useEffect } from 'react';
import type { AppProps, AppContext } from 'next/app';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import { Provider } from 'react-redux';
import NProgress from 'nprogress';
import { ConfigProvider } from '@arco-design/web-react';
import { GlobalContextProvide } from '@/ctx';
import { store } from '@/store';
import changeTheme from '@/utils/changeTheme';
import useStorage from '@/utils/useStorage';
import Layout from '@/components/Layout';

import '@/styles/global.less';

const useTheme = (
  inject: string
): [string | undefined, (s: string) => void] => {
  const [theme, setTheme] = useStorage('theme', inject || 'light');

  useEffect(() => {
    document.cookie = `theme=${theme}; path=/`;
    changeTheme(theme as string);
  }, [theme]);

  return [theme, setTheme];
};

const useProcess = () => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.set(0.4);
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
};

const MyApp = ({
  Component,
  pageProps,
  renderConfig,
}: AppProps & { renderConfig: { theme: string } }) => {
  const { theme: t } = renderConfig;
  const [theme, setTheme] = useTheme(t);

  useProcess();

  return (
    <ConfigProvider
      componentConfig={{
        Card: {
          bordered: false,
        },
        List: {
          bordered: false,
        },
        Table: {
          border: false,
        },
      }}
    >
      <Provider store={store}>
        <GlobalContextProvide value={{ theme, setTheme }}>
          {Component.displayName === 'LoginPage' ? (
            <Component {...pageProps} suppressHydrationWarning />
          ) : (
            <Layout>
              <Component {...pageProps} suppressHydrationWarning />
            </Layout>
          )}
        </GlobalContextProvide>
      </Provider>
    </ConfigProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const serverCookies = cookies(ctx);

  return {
    renderConfig: {
      theme: serverCookies['theme'],
    },
  };
};

export default MyApp;
