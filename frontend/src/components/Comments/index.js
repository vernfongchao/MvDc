import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React, { useState } from 'react'



const CommentsPage = ({ answerId, content, userId ,User}) => {


    const [showComments, setShowComments] = useState(false)



    return (
        <div>
            <p>{content}</p>
            <p>{User.username}</p>
        </div>
    )

}

export default CommentsPage