import { createSlice,  } from '@reduxjs/toolkit'
import { User } from '../../types'

export type State = {
  token?: string
  currentUser?: User
}

export const initialState: State = {
}

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

export default slice

export const { setToken, setCurrentUser } = slice.actions
