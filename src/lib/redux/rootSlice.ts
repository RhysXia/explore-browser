import { gql } from '@apollo/client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cookie } from 'next-cookie';
import { User } from '../../models/user';
import { TOKEN_KEY } from '../../utils/consts';
import { getApolloClient } from '../apollo';

export type State = {
  token?: string;
  currentUser?: User;
};

export const initialState: State = {};

const slideName = 'root';

const slice = createSlice({
  name: slideName,
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | undefined>) {
      state.token = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User | undefined>) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default slice;

export const { setToken, setCurrentUser } = slice.actions;

const queryCurrentUserGql = gql`
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
`;

export const queryCurrentUser = createAsyncThunk(
  `${slideName}/fetchCurrentUser`,
  async (_, thunkApi) => {
    const { data } = await getApolloClient().query<{ currentUser: User }>({
      query: queryCurrentUserGql,
    });

    thunkApi.dispatch(setCurrentUser(data.currentUser));
  },
);

const loginGql = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const login = createAsyncThunk(
  `${slideName}/login`,
  async (params: { username: string; password: string }, thunkApi) => {
    const { data } = await getApolloClient().mutate<{ login: string }>({
      mutation: loginGql,
      variables: params,
    });

    if (!data || !data.login) {
      return;
    }

    thunkApi.dispatch(setToken(data.login));

    await thunkApi.dispatch(queryCurrentUser());
  },
);

const logoutGql = gql`
  mutation {
    logout
  }
`;

export const logout = createAsyncThunk(`${slideName}/logout`, async (_, thunkApi) => {
  await getApolloClient().mutate({
    mutation: logoutGql,
  });

  thunkApi.dispatch(setToken(undefined));
  thunkApi.dispatch(setCurrentUser(undefined));

  const cookie = new Cookie();
  cookie.remove(TOKEN_KEY);
});
