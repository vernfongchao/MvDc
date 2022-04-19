import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import AnswerDelete from './AnswerDelete';


const QuestionDeleteModal = ({id}) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <div className='question-edit-modal-container'>
            <div className='answer-delete-button-container'>
                <button className='answer-delete-button' onClick={()=>setShowModal(true)}> Delete</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AnswerDelete setShowModal={setShowModal} id={id}/>
                </Modal>
            )}
        </div>
    );
}


export default QuestionDeleteModal
