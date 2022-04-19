import React, {} from 'react'

import { useSelector } from 'react-redux'

import './CommentsPage.css'
import CommentDeleteModal from '../CommentsDelete';



const CommentsPage = ({ answerId, content, userId, User, id }) => {


    const user = useSelector((state) => state.session.user)

    return (
        <div className='comments-content-container'>
            <p className='comments-content-text'>{content}</p>
            <p>{User.username}</p>
            {user?.id === userId && (
                <CommentDeleteModal id={id} />
                )}
        </div>
    )

}

export default CommentsPage