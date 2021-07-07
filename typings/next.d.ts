import { ApolloClient } from "@apollo/client";
import { Router } from "next/dist/client/router";
import { AppContextType } from "next/dist/next-server/lib/utils";
import { AppStore } from "./lib/redux";
declare module "next/app" {
  interface AppContext extends AppContextType<Router> {
    reduxStore: AppStore;
    apolloClient: ApolloClient;
  }
}
