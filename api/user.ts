import { getApolloClient } from "../apollo";
import { gql } from "@apollo/client";

export const login = (username: string, password: string) => {
  return getApolloClient().mutate<{ login: string }>({
    mutation: gql`
      mutation {
        login(username: $username, password: $password)
      }
    `,
    variables: {
      username,
      password,
    },
  });
};

export const getCurrentUser = () => {
  return getApolloClient().query({
    query: gql`
      query {
        currentUser {
          id
          username
          nickname
          email
          avatar
          bio
        }
      }
    `,
  });
};
