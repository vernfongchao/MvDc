import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginForm';
import SignupFormModal from '../SignupForm';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <SignupFormModal />
                <LoginFormModal />
            </>
        );
    }

    return (
        <ul className='nav-ul'>
            <li>
                <NavLink exact to="/">
                    <img className='nav-logo' src='../../images/MvDc2.png'></img>
                </NavLink>
            </li>
            <li className='nav-session' >
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;

