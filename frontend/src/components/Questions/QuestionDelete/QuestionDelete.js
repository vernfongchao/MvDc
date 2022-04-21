import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteQuestion } from "../../../store/question";

import { useEditDeleteModal } from '../QuestionEditDeleteModal'

const QuestionDelete = ({ setShowModal }) => {
    const { question } = useEditDeleteModal()

    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async (e) => {
        e.preventDefault()
        const deletedQuestion = await dispatch(deleteQuestion(question.id))
        if (deletedQuestion) return history.push('/activity')
    }

    return (
        <div className="delete-question-page-container">
            <div className="delete-question-header-container">
                <h1 className="delete-question-header"> Warning </h1>

            </div>
            <p className="delete-question-warning-message">Warning, This action is irreversible! Please confirm to delete.</p>

            <div className="delete-question-button-containers">
                <button id='question-delete-button' onClick={handleDelete}>Delete</button>
                <button id='question-delete-button' onClick={() => setShowModal(false)}>Cancel</button>
            </div>
        </div>
    )

}

export default QuestionDelete