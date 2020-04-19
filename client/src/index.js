import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.scss';
import App from './App';
import withSession from './components/session/withSession';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// link client with server
const client = new ApolloClient({
    uri: 'http://localhost:1234/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');

        operation.setContext({
            headers: {
                authorization: token
            }
        });
    },
    onError: ({ networkError, graphQLErrors }) => {
        if (networkError) {
            console.log('graphQLErrors', graphQLErrors);
            console.log('Network Error', networkError);
        }
    }
});

const RootWithSession = withSession(App);

ReactDOM.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <Router>
                <RootWithSession />
            </Router>
        </React.StrictMode>
    </ApolloProvider>,
    document.getElementById('root')
);
