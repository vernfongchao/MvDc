import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { editAnswer } from '../../../store/answer'

import ReactQuill from 'react-quill';


const AnswerEdit = ({ id, setShowModal, answerContent, questionId }) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const [content, setContent] = useState(answerContent)
    const [validationErrors, setValidationErrors] = useState([])
    const [delta, setDelta] = useState(answerContent)

    const handleSubmit = async (e) => {

        e.preventDefault()
        setValidationErrors([])
        const newAnswer = {
            id,
            content: delta,
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

        }
    }

    const handleChange = (content, delta, source, editor) => {
        setContent(content)
        setDelta(editor.getHTML(content))
    }

    return (
        <div>
            <div className='question-form-container'>
                <img
                    className="modal-background-img"
                    src="https://mcdn.wallpapersafari.com/medium/71/85/PmvI3y.jpg"
                    alt=''
                />
                <form className='' >
                    <div className='question-form-title'>
                        <h1 className='answer-edit-form-header'>
                            Edit Answer
                        </h1>
                    </div>
                    <div className='question-error-ul'>
                        {validationErrors.map((error, idx) =>
                            <div className='question-error-text-container' key={idx}>
                                <span className='question-error-text' >{error}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className='answer-form-content'>
                        <ReactQuill theme="snow"
                            value={content}
                            onChange={handleChange}
                            style={
                                {
                                    width: '450px',
                                    height: '150px',
                                }
                            } />
                        {/* <label htmlFor='content'>
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
                        </label> */}
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