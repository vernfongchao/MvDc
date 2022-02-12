
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React from 'react'

import AnswerEditModal from '../AnswerEdit';

import './Answers.css'

const Answers = () => {
    const { id } = useParams()
    const parseId = parseInt(id, 10)
    const user = useSelector((state) => state.session.user)
    const answers = useSelector((state) => state.answerState.answers)
    const answerArr = Object.values(answers)


    const answerQuestions = answerArr?.filter((answer) => answer.questionId === parseId
    )


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
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Answers