import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { ApolloProvider, gql } from "@apollo/client";
import { Provider } from "react-redux";
import { getApolloClient, useApollo } from "../../lib/apollo";
import { getReduxStore, useReduxStore } from "../../lib/redux";
import React from "react";
import getToken from "../../utils/getToken";
import { setToken } from "../../lib/redux/store";
import { User } from "../../model";

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = useReduxStore(pageProps.initialReduxState);

  const apolloClient = useApollo(pageProps.initialApolloState, store);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;

  const reduxStore = getReduxStore();
  const apolloClient = getApolloClient(undefined, reduxStore);

  reduxStore.dispatch(setToken("123"));

  console.log('init');

  // if (!reduxStore.getState().token) {
  //   const token = getToken(ctx.req);
  //   reduxStore.dispatch(setToken(token));

  //   const {data, errors} = await apolloClient.query<{currentUser: User}>({
  //     query: gql`query {
  //       currentUser {
  //         id
  //         username
  //         nickname
  //         email
  //         avatar
  //         bio
  //       }
  //     }`
  //   })

  //   if(errors) {

  //   }
  // }
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
