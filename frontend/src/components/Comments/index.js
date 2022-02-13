import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React, { useState } from 'react'

import './CommentsPage.css'



const CommentsPage = ({ answerId, content, userId, User }) => {


    const user = useSelector((state) => state.session.user)



    return (
        <div className='comments-content-container'>
            <p>{content}</p>
            <p>{User.username}</p>
            {/* {user.id === userId && (
                <div>
                    <button>edit</button>
                </div>)} */}
        </div>
    )

}

export default CommentsPage