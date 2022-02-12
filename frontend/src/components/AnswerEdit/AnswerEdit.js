import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from "react-router-dom";
import { editAnswer } from '../../store/answer'

const AnswerEdit = ({ id, setShowModal, answerContent, questionId }) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const [content, setContent] = useState(answerContent)
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = async (e) => {
        if (content) {
            e.preventDefault()
            setValidationErrors([])
            const newAnswer = {
                id,
                content,
                questionId,
                userId: sessionUser.id,
            }
            const createdAnswer = await dispatch(editAnswer(newAnswer))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setValidationErrors(data.errors)
                })
            if (createdAnswer) {
                setShowModal(false)
                reset()
            }
        }
    }
    const reset = () => {
        setContent('')
    }

    return (
        <div>
            <div className='question-form-container'>
                <form className='' >
                    <div className='question-form-title'>
                        <span className='question-form-header'>
                            Edit Answer
                        </span>
                    </div>
                    <ul className='login-error-ul'>
                        {validationErrors.map((error, idx) =>
                            <li className='error-text' key={idx}>{error}
                            </li>)}
                    </ul>
                    <div className='question-form-content'>
                        <label htmlFor='content'>
                            <br />
                            <textarea
                                className='question-input-text'
                                id='content'
                                rows='15'
                                cols='37'
                                value={content}
                                placeholder='Please go in depth here:'
                                onChange={(event) => setContent(event.target.value)}
                                required
                            ></textarea>
                        </label>
                    </div>
                    <div className='question-button-container'>
                        <button id='question-button' onClick={handleSubmit} >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default AnswerEdit