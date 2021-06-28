import { getApolloClient } from "../apollo";
import { gql } from "@apollo/client";
import { Article } from "../model";

export const getHotArticles = (offset: number = 0, limit: number = 10) => {
  return getApolloClient().query<{hotArticles: Array<Article>}>({
    query: gql`
      query($offset: String!, $limit: String!) {
        hotArticles(offset: $offset, limit: $limit) {
          id
          title
        }
      }
    `,
    variables: {
      offset,
      limit,
    },
  });
};

