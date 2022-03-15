import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'

import './CommentsPage.css'
import { deleteComment } from '../../store/comment';



const CommentsPage = ({ answerId, content, userId, User, id }) => {
    const dispatch = useDispatch()


    const user = useSelector((state) => state.session.user)

    const handleDelete = async (e) => {
        e.preventDefault()
        dispatch(deleteComment(id))
    }


    return (
        <div className='comments-content-container'>
            <p className='comments-content-text'>{content}</p>
            <p>{User.username}</p>
            {user?.id === userId && (
                <div className='comment-delete-button-container'>
                    <button className='commente-delete-button' onClick={handleDelete}>Delete</button>
                </div>
                )}
        </div>
    )

}

export default CommentsPage