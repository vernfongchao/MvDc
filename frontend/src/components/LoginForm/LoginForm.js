import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';

const LoginForm = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault()
        setValidationErrors([])
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValidationErrors(data.errors);
            });
    }
    const handleClick = (e) => {
        e.stopPropagation()

    }


    return (
        <>
            <div className='login-container'>
                <form className='login-form-container' onSubmit={handleSubmit}>
                    <div className='login-title'>
                        <h4 className='login-title-text'>Login</h4>
                    </div>
                    <ul className='login-error-ul'>
                        {validationErrors.map((error, idx) => <li className='error-text' key={idx}>{error}</li>)}
                    </ul>
                    <div className='login-text-container'>
                        <span className='login-text-font'>Username or Email</span>
                        <label >
                            <input
                                className='login-text-input'
                                type="text"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                                placeholder='Username'
                            />
                        </label>
                        <span className='login-text-font'>
                            Password
                        </span>
                        <label>
                            <input
                                className='login-text-input'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='Email'
                            />
                        </label>
                        <div className="login-button-container">
                            <button id='login-button' type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='login-footer-container'>
                <span className='login-footer'>img src: https://estaticos.megainteresting.com</span>
            </div>
        </>
    );
}

export default LoginForm