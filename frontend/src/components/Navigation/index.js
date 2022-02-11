import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginForm';
import SignupFormModal from '../SignupForm';
import QuestionFormModal from '../QuestionForm';

import './Navigation.css';


function Navigation({ isLoaded }) {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <QuestionFormModal user={sessionUser} />
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <SignupFormModal />
                <LoginFormModal />
            </>
        );
    }
    const returnHome = (e) => {
        history.push('/')
    }

    return (
        <ul className='nav-ul'>
            <li>
                <Link to="/">
                    <img className='nav-logo' src='../../images/MvDc2.png' alt='MvDc Logo' onClick={returnHome}></img>
                </Link>
            </li>
            <li className='nav-session' >
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;

