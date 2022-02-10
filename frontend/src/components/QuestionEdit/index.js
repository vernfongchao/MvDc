import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, } from 'react-router-dom'
import { editQuestion } from '../../store/question'
import { deleteQuestion } from '../../store/question'

import './QuestionEdit.css'

const QuestionEdit = ({ user, question, showForm, setShowForm }) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [title, setTitle] = useState(question?.title)
    const [content, setContent] = useState(question?.content)
    // const [showForm, setShowForm] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setValidationErrors([])
        const newQuestion = {
            id: question?.id,
            title,
            content,
            userId: user?.id
        }
        dispatch(editQuestion(newQuestion))
        setShowForm(false)
        history.push(`/questions/${question.id}`)
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
        <div>
            <div className='question-edit-container'>
                {!showForm && user && (user?.id === question?.userId) && (
                    <div>
                        <button id='question-edit-button' onClick={handleForm}>Edit</button>
                    </div>
                )}
                {!showForm && user && (user?.id === question?.userId) && (
                    <div>
                        <button id='question-delete-button' onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>

            {showForm && ((
                <div className=''>
                    <form className='' onSubmit={handleSubmit}>
                        <div className=''>
                            <span>
                                Question
                            </span>
                        </div>
                        <div className=''>
                            <label htmlFor='title'>
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
                        <div className=''>
                            <label htmlFor='content'>
                                <br />
                                <textarea
                                    id='content'
                                    rows='10'
                                    cols='40'
                                    value={content}
                                    placeholder='enter your description'
                                    onChange={(event) => setContent(event.target.value)}
                                ></textarea>
                            </label>
                        </div>
                        <div className=''>

                        </div>

                        <div className=''>
                            <button id='' type='submit'>Submit</button>
                        </div>
                    </form>
                    <button onClick={handleClick}>cancel</button>
                </div>
            ))}
        </div>
    )
}

export default QuestionEdit
