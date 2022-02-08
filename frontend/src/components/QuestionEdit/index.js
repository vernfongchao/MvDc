import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { editQuestion } from '../../store/question'


const QuestionEdit = ({ question, hideForm }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    const [title, setTitle] = useState(question.title)
    const [content, setContent] = useState(question.content)
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setValidationErrors([])
        const newQuestion = {
            id: question.id,
            title,
            content,
            userId: sessionUser.id
        }
        dispatch(editQuestion(newQuestion))
    }

    return (
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
        </div>
    )

}

export default QuestionEdit