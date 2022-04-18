import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { getApolloClient, useApollo } from '../lib/apollo';
import { getReduxStore, useReduxStore } from '../lib/redux';
import React, { useMemo } from 'react';
import { queryCurrentUser, setCurrentUser, setToken } from '../lib/redux/rootSlice';
import { Cookie } from 'next-cookie';
import { TOKEN_KEY } from '../utils/consts';
import { ThemeProvider, ConfigProvider, BaseTheme } from '@xl-vision/react';
import Error from 'next/error';
import LayoutMap, { LayoutKey } from '../layout';
import AppThemeContext, { defaultAppTheme } from '../lib/theme';
import CustomCssBaseline from '../components/CustomCssBaseline';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { initialReduxState, initialApolloState, layout = 'default', error, ...others } = pageProps;

  const store = useReduxStore(initialReduxState);

  const apolloClient = useApollo(initialApolloState, store);

  const theme: BaseTheme = useMemo(() => {
    return {
      color: {
        mode: 'light',
      },
    };
  }, []);

  const Layout = LayoutMap[layout as LayoutKey];

  const appTheme = useMemo(() => {
    return defaultAppTheme;
  }, []);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ConfigProvider language='zh-CN'>
          <AppThemeContext.Provider value={appTheme}>
            <ThemeProvider theme={theme}>
              <CustomCssBaseline />
              {error && <Error statusCode={error.code} title={error.title} />}
              <Layout>
                <Component {...others} />
              </Layout>
            </ThemeProvider>
          </AppThemeContext.Provider>
        </ConfigProvider>
      </ApolloProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;

  const reduxStore = getReduxStore();
  const apolloClient = getApolloClient(undefined, reduxStore);

  let rootState = reduxStore.getState().root;

  const cookie = new Cookie(ctx);

  const token = rootState.token || cookie.get(TOKEN_KEY);

  if (!rootState.currentUser) {
    if (token) {
      if (!rootState.token) {
        reduxStore.dispatch(setToken(token));
      }
      try {
        await reduxStore.dispatch(queryCurrentUser());
      } catch (err) {
        // 出现错误，重置token
        reduxStore.dispatch(setToken(undefined));
        cookie.remove(TOKEN_KEY);
      }
    }
  }

  rootState = reduxStore.getState().root;

  const newToken = rootState.token;

  if (newToken) {
    // 更新过期时间
    cookie.set(TOKEN_KEY, newToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
  } else {
    // token不存在，认为注销
    reduxStore.dispatch(setCurrentUser(undefined));
  }

  (ctx as any).reduxStore = reduxStore;
  (ctx as any).apolloClient = apolloClient;

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const initialReduxState = reduxStore.getState();

  const initialApolloState = apolloClient.cache.extract();

  const pageProps = {
    ...appProps.pageProps,
    initialReduxState,
    initialApolloState,
  };

  return { ...appProps, pageProps };
};

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   if (isDev) {
//     console.log(metric);
//   }
// }
