import React from 'react';
import { withRouter } from 'react-router-dom';

import './Auth.scss';

import { ApolloConsumer } from 'react-apollo'

const handleSignOut = (client, history) => {
    localStorage.setItem('token', '');
    client.resetStore();
    history.push('/');
}

const SignOut = ({ history }) => {
    return (
        <ApolloConsumer>
            {(client) => {
                return <button className="signout-btn uk-text-uppercase" onClick={() => handleSignOut(client, history)}>Sign Out</button>
            }}
        </ApolloConsumer>
    )
}

export default withRouter(SignOut);