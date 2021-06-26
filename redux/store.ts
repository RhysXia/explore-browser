import { createSlice, ThunkDispatch } from '@reduxjs/toolkit'
import { AppThunk } from '.'
import { User } from '../model'

export type State = {
  token?: string
  currentUser?: User
}

export const initialState: State = {}

const slice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload
    },
  },
})


export const login =
  (username: string, password: string): AppThunk =>
  async (dispatch) => {

  }

export default slice

export const { setToken } = slice.actions
