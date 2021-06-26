import type {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client'
import {Provider} from 'react-redux'
import {useApollo} from '../../apollo'
import { useStore } from '../../redux'
import jsCookie from 'js-cookie'
import React from 'react'

function MyApp({Component, pageProps}: AppProps) {

    const apolloClient = useApollo(pageProps.apolloState)

    const store = useStore(pageProps.reduxState)

    React.useEffect(() => {
        const token = jsCookie.get()
    }, [])


    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps}/>
            </ApolloProvider>
        </Provider>
    )

}

export default MyApp
