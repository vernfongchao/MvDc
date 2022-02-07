import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import QuestionForm from './QuestionForm';

import './QuestionForm.css'

function QuestionFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className=''>
                <button id='' onClick={() => setShowModal(true)}>Ask a Question</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <QuestionForm />
                </Modal>
            )}
        </>
    );
}

export default QuestionFormModal;