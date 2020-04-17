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
            console.log(data);
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
        <div className="sign-in">
            <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
                {(signInUser, { data, loading, error }) => {
                    return (
                        <form className="uk-grid-small" data-uk-grid onSubmit={e => handleSubmit(e, signInUser)}>
                            <div className="uk-width-1-2@s">
                                <input 
                                    className={ error ? 'uk-form-danger' : '' }
                                    type="text" 
                                    name="username" 
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="uk-width-1-2@s">
                                <input
                                    className={ error ? 'uk-form-danger' : '' }
                                    type="password" 
                                    name="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleChange}
                                />
                                { error && <Error error={error} /> }
                            </div>
                            <div className="uk-width-1-2@s uk-text-left">
                                <button type="submit">Sign in</button>
                                {/* <button type="submit" disabled={loading || validateForm()}>Sign up</button> */}
                            </div>
                        </form>
                    );
                }}
            </Mutation>
        </div>
    )
}

export default SignIn;
