import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

import './LoginForm.css';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='nav-login-button'>
                <button id='nav-login-button' onClick={() => setShowModal(true)}>Log In</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;