import { ApolloClient } from "@apollo/client";
import { AppStore } from "./lib/redux";

declare module 'next/dist/next-server/lib/utils' {
  type AppContextType<R extends NextRouter = NextRouter> = {
    Component: NextComponentType<NextPageContext>;
    AppTree: AppTreeType;
    ctx: NextPageContext;
    router: R;
    reduxStore: AppStore
    apolloClient: ApolloClient
  };
}
