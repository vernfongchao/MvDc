import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { postAnswer } from '../../../store/answer'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './AnswerForm.css'

const AnswerForm = ({ setShowModal }) => {
    const { id } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [delta, setDelta] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    console.log(content.length)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const newAnswer = {
            content: delta,
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

    const handleChange = (content, delta, source, editor) => {
        setContent(content)
        setDelta(editor.getHTML(content))
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
                    <h1 className='answer-form-header'>
                        Answer This Question
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
                                width: '455px',
                                height: '150px',
                            }
                        } />
                    {/* <br /> */}
                    {/* <textarea
                                className='answer-input-text'
                                id='content'
                                rows='10'
                                cols='37'
                                value={content}
                                placeholder='Please go in depth here:'
                                onChange={(event) => setContent(event.target.value)}
                                required
                            ></textarea> */}
                </div>
                <div className='answer-button-container'>
                    <button id='answer-button' onClick={handleSubmit} >Submit</button>
                </div>
            </form>
        </div>
    )

}

export default AnswerForm