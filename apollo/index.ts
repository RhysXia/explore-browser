import {ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client'
import {getMainDefinition} from "@apollo/client/utilities";
import WebSocketLink from "./WebSocketLink";
import {isClient, isServer} from "../utils/env";
import {useMemo} from "react";

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql'
});

const splitLink = isClient ? split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    new WebSocketLink({
        url: 'ws://localhost:8080/subscriptions',
        retryAttempts: 10,
    }),
    httpLink,
) : httpLink

const createClient = () => {
    const client = new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache(),
        ssrMode: isServer
    });
    return client
}

let apolloClient: ApolloClient<any>

export const getApolloClient = (initialState: object = {}) => {
    const _apolloClient = apolloClient ?? createClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();
        // Restore the cache using the data passed from getStaticProps/getServerSideProps
        // combined with the existing cached data
        _apolloClient.cache.restore({...existingCache, ...initialState});
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export const useApollo = (initialState: object) => {
    return useMemo(() => getApolloClient(initialState), [initialState]);
}