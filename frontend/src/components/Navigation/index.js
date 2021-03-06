import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginForm';
import SignupFormModal from '../SignupForm';
import QuestionFormModal from '../Questions/QuestionForm';
import SearchBar from '../SearchBar';

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
            <li className='nav-logo-container'>
                <Link to="/">
                    <img className='nav-logo' src='../../images/MvDc2.png' alt='MvDc Logo' onClick={returnHome}></img>
                </Link>
            </li>
            <li className='home-button-li'>
                <Link to='/'>
                    <button className='home-button'>
                        <i className="fa-solid fa-house-chimney"></i>
                    </button>
                </Link>

            </li>
            <SearchBar/>
            <li className='nav-session' >
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;

