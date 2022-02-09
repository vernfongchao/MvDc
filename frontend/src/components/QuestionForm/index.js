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
        e.preventDefault()
        setValidationErrors([])
        const newQuestion = {
            title,
            content,
            userId: sessionUser.id
        }
        const createdQuestion = await dispatch(createQuestion(newQuestion))
        console.log('Newly CREATED QUESTION -----------------', createQuestion)
        setShowModal(false)
        reset()
        if (createdQuestion) history.push('/activity');
    }

    const reset = () => {
        setTitle('')
        setContent('')
    }

    return (
        <>
            <div className=''>
                <button id='' onClick={() => setShowModal(true)}><i class="fas fa-plus"></i></button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='question-form-container'>
                        <form className='' >
                            <div className='question-form-title'>
                                <span>
                                    Question
                                </span>
                            </div>
                            <div className='question-title-input'>
                                <label htmlFor='title' required={true}>
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
                                        required={true}
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