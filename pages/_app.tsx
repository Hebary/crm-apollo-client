import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { client } from '../config';
import OrderState from '../context/OrderProvider';
export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}>
    <OrderState>
      <Component {...pageProps} />
    </OrderState>
  </ApolloProvider>
}
