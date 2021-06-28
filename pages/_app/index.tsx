import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { useApollo } from "../../apollo";
import { useStore } from "../../redux";
import React from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.apolloState);

  const store = useStore(pageProps.reduxState);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}
