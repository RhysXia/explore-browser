import { AppThunk } from ".";
import { getApolloClient } from "../apollo";
import { gql } from "@apollo/client";
import { setCurrentUser, setToken } from "./store";
import { getCurrentUser, login as loginApi } from "../api";

/**
 * 登录
 * @param username
 * @param password
 * @returns
 */
export const login = (username: string, password: string): AppThunk => async (
  dispatch
) => {
  const client = getApolloClient();
  const { data, errors } = await loginApi(username, password);
  if (errors?.length) {
    throw new Error(errors[0].message);
  }
  dispatch(setToken(data!.login));

  const { data: data2 } = await getCurrentUser();
  dispatch(setCurrentUser(data2.login));
};

