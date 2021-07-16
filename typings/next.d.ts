import { ApolloClient } from "@apollo/client";
import { NextPageContext, NextComponentType } from "next";
import { AppStore } from "../lib/redux";

declare type AppPageContext = NextPageContext & {
  reduxStore: AppStore;
  apolloClient: ApolloClient;
};

declare type Page = NextComponentType<
  AppPageContext,
  { layout?: LayoutKey; error?: { code: number; title?: string } }
>;
