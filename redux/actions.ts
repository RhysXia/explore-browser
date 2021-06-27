import { AppThunk } from '.'
import { getApolloClient } from '../apollo'
import { gql } from '@apollo/client'
import { setCurrentUser, setToken } from './store'

/**
 * 登录
 * @param username
 * @param password
 * @returns
 */
export const login =
  (username: string, password: string): AppThunk =>
  async (dispatch) => {
    const client = getApolloClient()
    const {data, errors} = await client.mutate<{login: string}>({
      mutation: gql`
        mutation {
          login(username: $username, password: $password)
        }
      `,
      variables: {
        username, password
      }
    })
    if(errors?.length) {
      throw new Error(errors[0].message)
    }
    dispatch(setToken(data!.login))

    const {data: data2} = await client.query({
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
      `
    })
    dispatch(setCurrentUser(data2.login))
  }
