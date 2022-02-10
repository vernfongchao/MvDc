import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { createQuestion } from '../../store/question'


import './QuestionForm.css'


function QuestionFormModal() {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        if (title || content) {
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
                    if (data && data.errors) setValidationErrors(data.errors);
                })
            if (createdQuestion) {
                setShowModal(false)
                reset()
                history.push(`/questions/${createdQuestion.id}`);
            }

        }
    }

    const reset = () => {
        setTitle('')
        setContent('')
    }

    return (
        <>
            <div className=''>
                <button id='add-question-button' onClick={() => setShowModal(true)}><i className="fas fa-plus"></i></button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='question-form-container'>
                        <form className='' >
                            <div className='question-form-title'>
                                <span className='question-form-header'>
                                    ASK A NEW QUESTION
                                </span>
                            </div>
                            <ul className='login-error-ul'>
                                {validationErrors.map((error, idx) =>
                                    <li className='error-text' key={idx}>{error}
                                    </li>)}
                            </ul>
                            <div className='question-title-input'>
                                <label htmlFor='title' >
                                    <br />
                                    <textarea
                                        className='question-input-text'
                                        id='title'
                                        rows='3'
                                        cols='37'
                                        value={title}
                                        placeholder='Question Title'
                                        onChange={(event) => setTitle(event.target.value)}
                                        required
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
                                        cols='37'
                                        value={content}
                                        placeholder='Please go in depth here:'
                                        onChange={(event) => setContent(event.target.value)}
                                        required
                                    ></textarea>
                                </label>
                            </div>
                            <div className='question-content-input'>

                            </div>

                            <div className='question-button-container'>
                                <button id='question-button' onClick={handleSubmit} >Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default QuestionFormModal;