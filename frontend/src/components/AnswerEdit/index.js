import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import AnswerEdit from "./AnswerEdit"
import { useDispatch } from "react-redux"
import { deleteAnswer, getAnswers } from "../../store/answer"

import './AnswerEdit.css'

// id= {id}questionId={parseId} answerContent={content}

const AnswerEditModal = ({ id, answerContent, questionId }) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = async (e) => {
        await dispatch(deleteAnswer(id))
        await dispatch(getAnswers())
    }

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
            <div className='answer-delete-button-container'>
                <button onClick={handleDelete} className='answer-delete-button'> Delete</button>
            </div>
        </div>
    )

}

export default AnswerEditModal