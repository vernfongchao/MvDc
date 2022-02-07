import React, { useState } from 'react'
import { useDispatch, useSelctor } from 'react-redux'
import { Redirect } from 'react-router-dom';


import './QuestionForm.css'

const QuestionForm = ({ user }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setValidationErrors([])

    }
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
                            onChange={(event) => setContent(event.target.value)}
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