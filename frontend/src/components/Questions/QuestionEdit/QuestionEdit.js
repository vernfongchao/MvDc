import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editQuestion } from '../../../store/question'

import { useEditDeleteModal } from '../QuestionEditDeleteModal'

const QuestionEdit = ({ setShowModal }) => {

    const { setEditDeleteModal, question } = useEditDeleteModal()

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)


    const [title, setTitle] = useState(question?.title)
    const [content, setContent] = useState(question?.content)
    const [validationErrors, setValidationErrors] = useState([])


    const handleSubmit = async (e) => {
            e.preventDefault()
            setValidationErrors([])
            const newQuestion = {
                id: question?.id,
                title,
                content,
                userId: user?.id
            }
            const editedQuestion = await dispatch(editQuestion(newQuestion))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setValidationErrors(data.errors);
                })
            if (editedQuestion) {
                setShowModal(false)
                setEditDeleteModal(false)
            }
    
    }

    const handleCancel = () => {
        setShowModal(false)
    }


    return (
        <div className='question-edit-page-container'>
            <form className='question-edit-form-container' >
                <img
                    className="modal-background-img"
                    src="https://c4.wallpaperflare.com/wallpaper/907/35/593/spiderman-hd-4k-5k-wallpaper-preview.jpg"
                    alt=''
                />
                <div className='question-edit-header-container'>
                    <h1 className='question-edit-title'>
                        Edit Question
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
                <div className=''>
                    <label htmlFor='title' className='question-edit-title' > Question Title
                        <br />
                        <textarea
                            className='question-edit-input-text'
                            id='title'
                            rows='3'
                            cols='60'
                            value={title}
                            placeholder='Question'
                            onChange={(event) => setTitle(event.target.value)}
                        ></textarea>
                    </label>
                </div>
                <div className=''>
                    <span className='question-edit-title'>
                        Description
                    </span>
                    <label htmlFor='content'>
                        <br />
                        <textarea
                            className='question-edit-input-text'
                            id='content'
                            rows='10'
                            cols='60'
                            value={content}
                            placeholder='enter your description'
                            onChange={(event) => setContent(event.target.value)}
                        ></textarea>
                    </label>
                </div>
                <div className='confirm-edit-container'>
                    <div className=''>
                        <button className='question-edit-button' onClick={handleSubmit}>Submit</button>
                    </div>
                    <div>
                        <button id='edit-button-cancel' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default QuestionEdit