import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { getApolloClient, useApollo } from "../../lib/apollo";
import { getReduxStore, useStore } from "../../lib/redux";
import React from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.reduxState);

  const apolloClient = useApollo(pageProps.apolloState, store);

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

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps({
    ...appContext,
    reduxStore,
    apolloClient,
  });

  return { ...appProps };
};
