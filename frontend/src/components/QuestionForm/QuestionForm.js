import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from "react-router-dom";
import { createQuestion } from '../../store/question'
import QuestionDetail from '../QuestionDetail';


import './QuestionForm.css'

const QuestionForm = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [question, setQuestion] = useState(false)

    const handleSubmit = async (e) => {
        setValidationErrors([])
        const newQuestion = {
            title,
            content,
            userId: sessionUser.id
        }
        const createdQuestion = await dispatch(createQuestion(newQuestion))
        console.log('Newly CREATED QUESTION -----------------', createQuestion)
        if (createdQuestion) setQuestion(true)
        if (question) history.push('/activity');
    };



    return (
        <div className='question-form-container'>
            <form className='' onSubmit={handleSubmit}>
                <div className='question-form-title'>
                    <span>
                        Question
                    </span>
                </div>
                <div className='question-title-input'>
                    <label htmlFor='title'>
                        <br />
                        <textarea
                            id='title'
                            rows='3'
                            cols='40'
                            value={title}
                            placeholder='Question'
                            onChange={(event) => setTitle(event.target.value)}
                        ></textarea>
                    </label>
                </div>
                <span>
                    Description
                </span>
                <div className='question-form-content'>
                    <label htmlFor='content'>
                        <br />
                        <textarea
                            id='content'
                            rows='10'
                            cols='40'
                            value={content}
                            placeholder='enter your description'
                            onChange={(event) => setContent(event.target.value)}
                        ></textarea>
                    </label>
                </div>
                <div className='question-content-input'>

                </div>

                <div className='question-button-container'>
                    <button id='question-button' type='submit'>Submit</button>

                </div>
            </form>
        </div>
    )
}

export default QuestionForm