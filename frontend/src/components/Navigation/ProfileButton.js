import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';



function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()
    const user = useSelector(state => state.session.user);


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        return history.push('/')
    };

    return (
        <>
            <button onClick={openMenu} className='profile-button'>
                <i className="fas fa-users"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown-menu">
                    <li className="drop-down-user">{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button id='dropdown-logout-button' onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;

