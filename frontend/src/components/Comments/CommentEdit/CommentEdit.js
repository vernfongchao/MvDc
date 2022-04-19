import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { editComment } from "../../../store/comment";

const CommentEdit = ({ comment, setShowModal }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [content, setContent] = useState(comment.content)
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const editedComment = {
            id: comment.id,
            answerId: comment.answerId,
            userId: user.id,
            content,
        }
        const new_comment = await dispatch(editComment(editedComment))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValidationErrors(data.errors);
            }) 
        if (new_comment){
            setShowModal(false)
        }
    }


    return (
        <div className="comment-edit-form-page-container">
            <img
                className="modal-background-img"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6ba2f2be-be13-46f6-aa12-b87eafc5681b/dd21xbv-6017d26e-6ff9-4e7f-a489-1a209dba8da2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZiYTJmMmJlLWJlMTMtNDZmNi1hYTEyLWI4N2VhZmM1NjgxYlwvZGQyMXhidi02MDE3ZDI2ZS02ZmY5LTRlN2YtYTQ4OS0xYTIwOWRiYThkYTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hHMh56Z-UWJYOCaPEK4APLyY0X7ppozdNGe0rh7eFGI"
                alt=''
            />
            <form onSubmit={handleSubmit}>
                <div className='question-form-title'>
                    <h1 className='comment-edit-form-header'>
                        Edit Comment
                    </h1>
                </div>
                <div className='question-error-ul'>
                    {validationErrors.map((error, idx) =>
                        <div className='question-error-text-container' key={idx}>
                            <span className='question-error-text'>{error}
                            </span>
                        </div>
                    )}
                </div>
                <div className='question-form-content'>
                    <label htmlFor='content'>
                        <br />
                        <textarea
                            className='question-input-text'
                            id='content'
                            rows='8'
                            cols='60'
                            value={content}
                            placeholder='Please go in depth here:'
                            onChange={(event) => setContent(event.target.value)}
                            required
                        ></textarea>
                    </label>
                </div>

                <div className="comment-edit-cancel-container">
                    <button className="comment-edit-button" >Edit</button>
                    <button className="comment-edit-button" type="button" onClick={() => setShowModal(false)}>Cancel</button>
                </div>

            </form>

        </div>
    )
}

export default CommentEdit

