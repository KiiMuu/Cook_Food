import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Error from '../error/Error';

import { SIGNUP_USER } from '../../queries/index';

const SignUp = (props) => {

    const history = useHistory();

    const [signUp, setSignUp] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { username, email, password, confirmPassword } = signUp;

    const handleChange = e => setSignUp({
        ...signUp,
        [e.target.name]: e.target.value
    });

    const handleSubmit = (e, signUpUser) => {
        e.preventDefault();

        signUpUser().then(async ({ data }) => {
            // console.log(data);
            localStorage.setItem('token', data.signupuser.token);
            await props.refetch();
            setSignUp({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            history.push('/');
        });
    }

    const validateForm = () => {
        const isInvalid = !username || !email || !password || password !== confirmPassword;

        return isInvalid;
    }


    return (
        <div className="sign-up uk-margin-medium-top">
            <div className="uk-container uk-container-small">
                <h2 className="uk-text-uppercase uk-text-center">Sign In</h2>
                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password, confirmPassword }}>
                    {(signUpUser, { data, loading, error }) => {
                        return (
                            <form className="uk-grid-small" data-uk-grid onSubmit={e => handleSubmit(e, signUpUser)}>
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
                                        type="email" 
                                        name="email" 
                                        placeholder="Email Address"
                                        value={email}
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
                                <div className="uk-width-1-2@s">
                                    <input
                                        className="uk-input"
                                        type="password" 
                                        name="confirmPassword" 
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="uk-width-1-2@s uk-text-left">
                                    <button disabled={loading || validateForm()} type="submit" className="uk-button uk-button-primary">Sign up</button>
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

export default SignUp;
