import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, } from 'react-router-dom'
import { editQuestion } from '../../store/question'
import { deleteQuestion } from '../../store/question'

const QuestionEdit = ({ user, question }) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [title, setTitle] = useState(question?.title)
    const [content, setContent] = useState(question?.content)
    const [showForm, setShowForm] = useState(false)
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
        console.log(question)
        setShowForm()
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
            <div>
                {!showForm && (user?.id === question?.userId) && (
                    <div>
                        <button onClick={handleForm}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>
            {showForm && ((
                <div className='question-form-container'>
                    <form className='' onSubmit={handleSubmit}>
                        <div className='question-form-title'>
                            <span>
                                Question
                            </span>
                        </div>
                        <div className='question-title-input'>
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
                                ></textarea>
                            </label>
                        </div>
                        <div className='question-content-input'>

                        </div>

                        <div className='question-button-container'>
                            <button id='question-button' type='submit'>Submit</button>
                        </div>
                    </form>
                    <button onClick={handleClick}>cancel</button>
                </div>
            ))}
        </div>
    )
}

export default QuestionEdit
