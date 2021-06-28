import { getApolloClient } from "../apollo";
import { gql } from "@apollo/client";
import { User } from "../model";

export const login = (username: string, password: string) => {
  return getApolloClient().mutate<{ login: string }>({
    mutation: gql`
      mutation($username: String!, $password: String!) {
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
  return getApolloClient().query<{currentUser: User}>({
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
