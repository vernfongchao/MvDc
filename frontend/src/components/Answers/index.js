
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getQuestionById } from '../../store/question';
import { useHistory } from 'react-router-dom';
import { getFiveQuestions } from '../../store/question';
import { getAnswerByQuestion } from '../../store/answer';
import AnswerEditModal from '../AnswerEdit';

import './Answers.css'

const Answers = () => {
    const { id } = useParams()

    const parseId = parseInt(id, 10)
    const user = useSelector((state) => state.session.user)
    const answers = useSelector((state) => state.answerState.answers)
    const answerArr = Object.values(answers)

    useEffect(() => {
    }, []);





    const answerQuestions = answerArr?.filter((answer) => answer.questionId === parseId
    )


    return (
        <div className='answer-page-container'>
            {answerQuestions?.map(({ User, userId, content, id}) => (
                <div className='each-answer-outer'>
                    <div className='each-answer-container'>
                        <p className='answer-username-text'>{User.username}</p>
                        <p className='answer-content'>{content}</p>
                        <div>
                            {(user?.id === userId) &&
                                (<AnswerEditModal id={parseId} answerContent={content}/>)
                            }
                        </div>
                    </div>

                </div>
            ))}
        </div>

    )
}

export default Answers