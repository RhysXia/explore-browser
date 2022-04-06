import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { ApolloProvider, gql } from '@apollo/client';
import { Provider } from 'react-redux';
import { getApolloClient, useApollo } from '../lib/apollo';
import { getReduxStore, useReduxStore } from '../lib/redux';
import React, { useMemo } from 'react';
import { setCurrentUser, setToken } from '../lib/redux/store';
import { Cookie } from 'next-cookie';
import { User } from '../models/user';
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

  const state = reduxStore.getState();

  const cookie = new Cookie(ctx);

  const token = state.token || cookie.get(TOKEN_KEY);

  if (!state.currentUser) {
    if (token) {
      if (!state.token) {
        reduxStore.dispatch(setToken(token));
      }
      try {
        const { data } = await apolloClient.query<{ currentUser: User }>({
          query: gql`
            query {
              currentUser {
                id
                username
                nickname
                email
                avatar
                bio
              }
            }
          `,
        });
        reduxStore.dispatch(setCurrentUser(data.currentUser));
      } catch (err) {
        // 出现错误，重置token
        reduxStore.dispatch(setToken(undefined));
        cookie.remove(TOKEN_KEY);
      }
    }
  }

  const newToken = reduxStore.getState().token;

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
