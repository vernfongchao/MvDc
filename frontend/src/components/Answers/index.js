
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React, { useState } from 'react'

import AnswerEditModal from '../AnswerEdit';
import CommentsPage from '../Comments';

import './Answers.css'

const Answers = () => {
    const { id } = useParams()
    const parseId = parseInt(id, 10)
    const user = useSelector((state) => state.session.user)
    const answers = useSelector((state) => state.answerState.answers)
    const answerArr = Object.values(answers)

    const comments = useSelector(state => state.commentState.comments)
    const commentsValues = Object.values(comments)
    console.log(commentsValues, '<=============================')

    const [showComments, setShowComments] = useState(false)


    const answerQuestions = answerArr?.filter((answer) => answer.questionId === parseId
    )

    const openComments = (e) => {
        setShowComments(!showComments)
    }

    return (
        <div className='answer-page-container'>
            {answerQuestions?.map(({ User, userId, content, id }) => (
                <div className='each-answer-outer' key={id}>
                    <div className='each-answer-container'>
                        <p className='answer-username-text'>{User.username}</p>
                        <p className='answer-content'>{content}</p>
                        <div >
                            <div>
                                {(user?.id === userId) &&
                                    (<AnswerEditModal id={id} questionId={parseId} answerContent={content} />)
                                }
                            </div>
                        </div>


                        <div>
                            <button onClick={openComments}>
                                <i className="fa-solid fa-comments"></i>
                            </button>
                        </div>


                        {showComments && commentsValues?.map(({ answerId, userId, content, User }) => (
                            ((answerId === id) && (
                                <CommentsPage
                                    answerId={answerId}
                                    userId={userId}
                                    content={content}
                                    User={User}
                                />
                            )
                            )))}
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Answers