import React, { } from 'react'

import { useSelector } from 'react-redux'

import './CommentsPage.css'
import CommentDeleteModal from '../CommentsDelete';



const CommentsPage = ({comment}) => {


    const user = useSelector((state) => state.session.user)


    return (
        <div className='comments-content-container'>
            <p className='comments-content-text'>{comment?.content}</p>
            <p>{comment.User.username}</p>
            {user?.id === comment?.userId && (
                <>
                    <CommentDeleteModal comment={comment}/>
                </>
            )}
        </div>
    )

}

export default CommentsPage