import React from "react";
import { useDispatch } from "react-redux";
import { deleteAnswer } from "../../../store/answer";



const AnswerDelete = ({id, setShowModal }) => {
    const dispatch = useDispatch()

    const handleDelete = (e) => {
        dispatch(deleteAnswer(id))
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

export default AnswerDelete