import { ApolloClient } from "@apollo/client";
import { NextPageContext } from "next";
import { AppStore } from "../lib/redux";

declare type AppPageContext = NextPageContext & {
  reduxStore: AppStore;
  apolloClient: ApolloClient;
};
