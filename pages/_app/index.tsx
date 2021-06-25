import type {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../../apollo'

function MyApp({Component, pageProps}: AppProps) {

    const client = useApollo(pageProps.apolloState)

    return (
        <ApolloProvider client={client}>
            <Component {...pageProps}/>
        </ApolloProvider>
    )

}

export default MyApp
