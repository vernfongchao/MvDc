import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionForm from './QuestionForm';


import './QuestionForm.css'


function QuestionFormModal() {

    const [showModal, setShowModal] = useState(false);


    return (
        <div className='question-form-page-container'>
            <div className=''>
                <button id='add-question-button' onClick={() => setShowModal(true)}><i className="fa-solid fa-plus"></i></button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <QuestionForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    );
}


export default QuestionFormModal;