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
        <div className="sign-up">
            <Mutation mutation={SIGNUP_USER} variables={{ username, email, password, confirmPassword }}>
                {(signUpUser, { data, loading, error }) => {

                    return (
                        <form className="uk-grid-small" data-uk-grid onSubmit={e => handleSubmit(e, signUpUser)}>
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
                                    type="email" 
                                    name="email" 
                                    placeholder="Email Address"
                                    value={email}
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
                            </div>
                            <div className="uk-width-1-2@s">
                                <input
                                    className={ error ? 'uk-form-danger' : '' }
                                    type="password" 
                                    name="confirmPassword" 
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={handleChange}
                                />
                                { error && <Error error={error} /> }
                            </div>
                            <div className="uk-width-1-2@s uk-text-left">
                                <button type="submit">Sign up</button>
                                {/* <button type="submit" disabled={loading || validateForm()}>Sign up</button> */}
                            </div>
                        </form>
                    );
                }}
            </Mutation>
        </div>
    )
}

export default SignUp;
