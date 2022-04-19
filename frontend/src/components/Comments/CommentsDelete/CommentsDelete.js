import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../store/comment";



const CommentsDelete = ({ comment, setShowModal }) => {
    const dispatch = useDispatch()

    const handleDelete = (e) => {
        dispatch(deleteComment(comment.id))
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

export default CommentsDelete