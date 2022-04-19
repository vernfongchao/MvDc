import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionEdit from './QuestionEdit';


import './QuestionEdit.css'


const QuestionEditModal = ()  => {

    const [showModal, setShowModal] = useState(false);

    return (
        <div className='question-edit-modal-container'>
            <div>
                <button className='question-edit-button' onClick={() => setShowModal(true)}>Edit</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <QuestionEdit setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}


export default QuestionEditModal;
