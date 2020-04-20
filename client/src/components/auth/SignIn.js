import React, { useState } from 'react';
import { useHistory  } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Error from '../error/Error';

import { SIGNIN_USER } from '../../queries/index';

const SignIn = (props) => {

    const history = useHistory(); // to redriect user

    const [signIn, setSignIn] = useState({
        username: '',
        password: ''
    });

    const { username, password } = signIn;

    const handleChange = e => setSignIn({
        ...signIn,
        [e.target.name]: e.target.value
    });

    const handleSubmit = (e, signInUser) => {
        // let history = useHistory();
        e.preventDefault();

        signInUser().then(async ({ data }) => {
            // console.log(data);
            localStorage.setItem('token', data.signinuser.token);
            await props.refetch();
            setSignIn({
                username: '',
                password: ''
            });
            history.push('/');
        });
    }

    const validateForm = () => {
        const isInvalid = !username || !password;

        return isInvalid;
    }

    return (
        <div className="sign-in uk-margin-medium-top">
            <div className="uk-container uk-container-small">
                <h2 className="uk-text-uppercase uk-text-center">Sign In</h2>
                <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
                    {(signInUser, { data, loading, error }) => {
                        return (
                            <form className="uk-grid-small" data-uk-grid onSubmit={e => handleSubmit(e, signInUser)}>
                                <div className="uk-width-1-2@s">
                                    <input 
                                        className="uk-input"
                                        type="text" 
                                        name="username" 
                                        placeholder="Username"
                                        value={username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="uk-width-1-2@s">
                                    <input
                                        className="uk-input"
                                        type="password" 
                                        name="password" 
                                        placeholder="Password"
                                        value={password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="uk-width-1-2@s uk-text-left">
                                    <button type="submit" disabled={loading || validateForm()} className="uk-button uk-button-primary">Sign up</button>
                                </div>
                                <div className="uk-width-1-2@s uk-text-left">
                                    { error && <Error error={error} /> }
                                </div>
                            </form>
                        );
                    }}
                </Mutation>
            </div>
        </div>
    )
}

export default SignIn;
