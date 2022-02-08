import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import QuestionForm from './QuestionForm';

import './QuestionForm.css'

function QuestionFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className=''>
                <button id='' onClick={() => setShowModal(true)}><i class="fas fa-plus"></i></button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <QuestionForm onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default QuestionFormModal;