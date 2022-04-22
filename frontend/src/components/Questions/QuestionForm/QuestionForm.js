import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { createQuestion } from '../../../store/question'

const QuestionForm = ({ setShowModal }) => {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = async (e) => {

        e.preventDefault()
        setValidationErrors([])
        const newQuestion = {
            title,
            content,
            userId: sessionUser.id
        }
        const createdQuestion = await dispatch(createQuestion(newQuestion))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValidationErrors([...data.errors]);
            })
        if (createdQuestion) {
            setShowModal(false)
            reset()
            history.push(`/questions/${createdQuestion.id}`);
        }

    }

    const reset = () => {
        setTitle('')
        setContent('')
    }

    return (
        <div className='question-form-container'>
            <form className='question-form-page-container' >
                <img
                    className="modal-background-img"
                    src="https://c4.wallpaperflare.com/wallpaper/907/35/593/spiderman-hd-4k-5k-wallpaper-preview.jpg"
                    alt=''
                />
                <div className='question-form-title'>
                    <h1 className='question-form-header'>
                        ASK A QUESTION
                    </h1>
                </div>
                <div className='question-error-ul'>
                    {validationErrors.map((error, idx) =>
                        <div className='question-error-text-container' key={idx}>
                            <span className='question-error-text'>{error}
                            </span>
                        </div>
                    )}
                </div>
                <div className='question-title-input'>
                    <label htmlFor='title' >
                        <br />
                        <textarea
                            className='question-input-text'
                            id='title'
                            rows='4'
                            cols='60'
                            value={title}
                            placeholder='Question Title'
                            onChange={(event) => setTitle(event.target.value)}
                        ></textarea>
                    </label>
                </div>
                <div className='question-form-content'>
                    <label htmlFor='content'>
                        <br />
                        <textarea
                            className='question-input-text'
                            id='content'
                            rows='8'
                            cols='60'
                            value={content}
                            placeholder='Please go in depth here:'
                            onChange={(event) => setContent(event.target.value)}
                        ></textarea>
                    </label>
                </div>
                <div className='question-button-container'>
                    <button id='question-button' onClick={handleSubmit} >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default QuestionForm
