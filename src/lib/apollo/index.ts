import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import WebSocketLink from './WebSocketLink';
import { isClient, isServer, serverHost } from '../../utils/env';
import { AppStore, getReduxStore } from '../redux';

const createClient = (store?: AppStore) => {
  const httpLink = new HttpLink({
    uri: `http://${serverHost}/graphql`,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => {
      const token = store?.getState().token;
      if (token) {
        return {
          headers: {
            ...headers,
            authorization: token,
          },
        };
      }
      return {
        headers,
      };
    });

    return forward(operation);
  });

  const httpAuthLink = from([authMiddleware, httpLink]);

  const splitLink = isClient
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
          );
        },
        new WebSocketLink({
          url: `ws://${serverHost}/subscription`,
          retryAttempts: 10,
          connectionParams: async () => {
            const token = store?.getState().token;
            if (token) {
              return {
                token,
              };
            }
            return {};
          },
        }),
        httpAuthLink,
      )
    : httpAuthLink;

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    ssrMode: isServer,
  });
  return client;
};

let apolloClient: ApolloClient<any>;

export const getApolloClient = (initialState?: object, store: AppStore = getReduxStore()) => {
  const _apolloClient = apolloClient ?? createClient(store);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (isServer) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export const useApollo = (initialState: object, store: AppStore) => {
  if (apolloClient) {
    return apolloClient;
  }
  return getApolloClient(initialState, store);
};
