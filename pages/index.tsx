import Head from 'next/head'
import { gql, useQuery } from '@apollo/client'
import { getApolloClient } from '../apollo'
import { GetStaticProps, NextComponentType } from 'next'
import { getReduxStore, useAppSelector } from '../redux'
import {  } from '../redux/store'
import { useSelector } from 'react-redux'

const message = gql`
  query {
    categories {
      name
      id
    }
  }
`

const Home: NextComponentType = (props) => {
  const { data, loading } = useQuery(message)

  const token = useAppSelector(state => state.token)

  console.log(data, token)

  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!loading &&
          data.categories.map((it) => <p key={it.name}>{it.name}</p>)}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getApolloClient()
  await client.query({
    query: message,
  })
  const store = getReduxStore()

  const { dispatch } = store

//   dispatch(increaseCount())

  return {
    props: {
      apolloState: client.cache.extract(),
      reduxState: store.getState(),
    },
  }
}

export default Home
