import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './SignupForm.css';

const SignupForm = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setValidationErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setValidationErrors(data.errors);
                });
        }
        reset()
        return setValidationErrors(['Confirm Password field must be the same as the Password field']);
    };

    const reset = () => {
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div className='signup-container'>
            <form className="signup-form-container" onSubmit={handleSubmit}>
                <div className='signup-title'>
                    <h4 className='signup-title-text'>Sign Up</h4>
                </div>
                <ul>
                    {validationErrors.map((error, idx) => <li className='error-text' key={idx}>{error}</li>)}
                </ul>
                <div className='signup-text-container'>
                    <label >
                        <input
                            className='signup-text-input'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Email'
                        />
                    </label>
                    <label>
                        <input
                            className='signup-text-input'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder='Username'
                        />
                    </label>
                    <label>
                        <input
                            className='signup-text-input'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        />
                    </label>
                    <label>
                        <input
                            className='signup-text-input'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder='Confirm Password'
                        />
                    </label>
                    <div className="sign-button-container">
                        <button id='sign-button' type="submit">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;