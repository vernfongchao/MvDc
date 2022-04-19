import React, { useState } from "react"
import { Modal } from "../../../context/Modal"
import AnswerEdit from "./AnswerEdit"
import AnswerDeleteModal from '../AnswerDelete'

import './AnswerEdit.css'

// id= {id}questionId={parseId} answerContent={content}

const AnswerEditModal = ({ id, answerContent, questionId }) => {
    const [showModal, setShowModal] = useState(false)


    return (
        <div className='answer-buttons-container'>
            <div >
                <button className="open-answer-button" onClick={() => setShowModal(true)}>Edit</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AnswerEdit setShowModal={setShowModal} id={id} answerContent={answerContent} questionId={questionId} />
                </Modal>
            )}
            <AnswerDeleteModal id={id} />
        </div>
    )

}

export default AnswerEditModal