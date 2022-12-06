import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';


const httpLink = createHttpLink({
    uri: 'http://localhost:4000/'
});


const authlink : any = setContext((_, { headers }) => {

    const token = localStorage.getItem('token');

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }

});

export const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authlink.concat(httpLink)
});
