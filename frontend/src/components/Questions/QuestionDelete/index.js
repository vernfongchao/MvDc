import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionDelete from './QuestionDelete';

import './QuestionDelete.css'


const QuestionDeleteModal = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <div className='question-edit-modal-container'>
            <div>
                <button id='question-delete-button' onClick={() => setShowModal(true)}>Delete</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <QuestionDelete setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}


export default QuestionDeleteModal;
