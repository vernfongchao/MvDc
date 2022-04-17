import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { createQuestion } from '../../store/question'


import './QuestionForm.css'


function QuestionFormModal() {
    // console.log("rerenders?")
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        if (title && content) {
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
        setValidationErrors([])
    }

    const reset = () => {
        setTitle('')
        setContent('')
    }

    const handleClose = (e) => {
        setShowModal(false)
        reset()
    }

    return (
        <div className='question-form-page-container'>
            <div className=''>
                <button id='add-question-button' onClick={() => setShowModal(true)}><i className="fa-solid fa-plus"></i></button>
            </div>
            {showModal && (
                <Modal onClose={handleClose}>
                    <div className='question-form-container'>
                        <img
                            className="modal-background-img"
                            src="https://c4.wallpaperflare.com/wallpaper/907/35/593/spiderman-hd-4k-5k-wallpaper-preview.jpg"
                            alt=''
                        />
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
                                        rows='4'
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
                            <div className='question-button-container'>
                                <button id='question-button' onClick={handleSubmit} >Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
}


export default QuestionFormModal;