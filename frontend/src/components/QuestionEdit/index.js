import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editQuestion } from '../../store/question'
import { deleteQuestion } from '../../store/question'

import './QuestionEdit.css'

const QuestionEdit = ({ user, question, showForm, setShowForm, validationErrors, setValidationErrors }) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [title, setTitle] = useState(question?.title)
    const [content, setContent] = useState(question?.content)
    // const [validationErrors, setValidationErrors] = useState([])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        if (title && content) {
            e.preventDefault()
            setValidationErrors([])
            const newQuestion = {
                id: question?.id,
                title,
                content,
                userId: user?.id
            }
            await dispatch(editQuestion(newQuestion))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setValidationErrors(data.errors);
                })

            setShowForm(false)
        }
    }


    const handleClick = (e) => {
        setShowForm(false)
    }

    const handleForm = (e) => {
        setTitle(question?.title)
        setContent(question?.content)
        setShowForm(true)
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const deletedQuestion = await dispatch(deleteQuestion(question.id))
        if (deletedQuestion) return history.push('/')
    }


    return (
        <div className='question-edit-page-container'>
            <div>
                <ul className='login-error-ul'>
                    {validationErrors.map((error, idx) =>
                        <li className='error-text' key={idx}>{error}
                        </li>)}
                </ul>
            </div>
            <div className='question-edit-container'>
                {!showForm && user && (user?.id === question?.userId) && (
                    <div>
                        <button className='question-edit-button' onClick={handleForm}>Edit</button>
                    </div>
                )}
                {!showForm && user && (user?.id === question?.userId) && (
                    <div className='question-delete-button-container'>
                        <button id='question-delete-button' onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>
            {showForm && ((
                <div className=''>
                    <form className='' >
                        <div className=''>
                            <span className='question-edit-title'>
                                Question
                            </span>
                        </div>
                        <div className=''>
                            <label htmlFor='title'>
                                <br />
                                <textarea
                                    className='question-edit-input-text'
                                    id='title'
                                    rows='3'
                                    cols='60'
                                    value={title}
                                    placeholder='Question'
                                    onChange={(event) => setTitle(event.target.value)}
                                    required
                                ></textarea>
                            </label>
                        </div>
                        <span className='question-edit-title'>
                            Description
                        </span>
                        <div className=''>
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
                                    required
                                ></textarea>
                            </label>
                        </div>


                        <div className='confirm-edit-container'>


                            <div className=''>
                                <button className='question-edit-button' onClick={handleSubmit}>Edit</button>
                            </div>
                            <div>

                                <button id='edit-button-cancel' onClick={handleClick}>Cancel</button>
                            </div>
                        </div>

                    </form>
                </div>
            ))}
        </div>
    )
}

export default QuestionEdit
