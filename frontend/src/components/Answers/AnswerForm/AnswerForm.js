import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { postAnswer } from '../../../store/answer'

import './AnswerForm.css'

const AnswerForm = ({ setShowModal }) => {
    const { id } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = async (e) => {
        if (content) {
            e.preventDefault()
            setValidationErrors([])
            const newAnswer = {
                content,
                questionId: id,
                userId: sessionUser.id,
            }
            await dispatch(postAnswer(newAnswer))
                .then(() => {
                    setShowModal(false)
                    setContent('')
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setValidationErrors(data.errors)
                })
        }

    }

    return (
            <div className='answer-form-container'>
                <img
                    className="modal-background-img"
                    src="https://mcdn.wallpapersafari.com/medium/11/11/0sAWLv.jpg"
                    alt=''
                />
                <form className='' >
                    <div className='answer-form-title'>
                        <span className='answer-form-header'>
                            Answer This Question
                        </span>
                    </div>
                <div className='login-error-ul'>
                    {validationErrors.map((error, idx) =>
                        <div className='error-text-container' key={idx}>
                            <span className='error-text' >{error}
                            </span>
                        </div>
                    )}
                </div>
                    <div className='answer-form-content'>
                        <label htmlFor='content'>
                            <br />
                            <textarea
                                className='answer-input-text'
                                id='content'
                                rows='10'
                                cols='37'
                                value={content}
                                placeholder='Please go in depth here:'
                                onChange={(event) => setContent(event.target.value)}
                                required
                            ></textarea>
                        </label>
                    </div>
                    <div className='answer-button-container'>
                        <button id='answer-button' onClick={handleSubmit} >Submit</button>
                    </div>
                </form>
            </div>
    )

}

export default AnswerForm