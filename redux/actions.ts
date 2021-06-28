import { AppThunk } from ".";
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
  const { data, errors } = await loginApi(username, password);
  if (errors?.length) {
    throw new Error(errors[0].message);
  }
  await dispatch(setToken(data!.login));

  const { data: data2 } = await getCurrentUser();
  await dispatch(setCurrentUser(data2.currentUser));
};

