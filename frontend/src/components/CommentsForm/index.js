import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { postComment } from '../../store/comment';
import CommentsPage from '../Comments';

import './CommentsForm.css'


const CommentsForm = ({ id }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const [content, setContent] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [showComments, setShowComments] = useState(false)
    const answers = useSelector((state) => state.answerState.answers)

    const comments = useSelector(state => state.commentState.comments)
    const commentsValues = Object.values(comments)
    console.log(commentsValues, '<=============================')

    const handleSubmit = async (e) => {
        if (content) {
            e.preventDefault()
            setValidationErrors([])
            const newComment = {
                userId: user.id,
                answerId: id,
                content
            }
            await dispatch(postComment(newComment))
                .then(() => {
                    reset()
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setValidationErrors(data.errors)
                })
        }

    }

    const reset = () => {
        setContent('')
    }

    const openComments = (e) => {
        setShowComments(!showComments)
    }

    return (
        <div className='comment-form-container'>
            <div className='show-comments-button-container'>
                <button onClick={openComments} className='show-comments-button'>
                    <i className="fa-solid fa-comments"></i>
                </button>
            </div>
            {showComments &&
                (<form className=''>
                    <ul className='login-error-ul'>
                        {validationErrors.map((error, idx) =>
                            <li className='error-text' key={idx}>{error}
                            </li>)}
                    </ul>
                    <div className='comment-form-container'>
                        <label htmlFor='title'>
                            <br />
                            <textarea
                                className='comment-input-text'
                                id='title'
                                rows='3'
                                cols='60'
                                value={content}
                                placeholder='Post a Comment'
                                onChange={(event) => setContent(event.target.value)}
                                required
                            ></textarea>
                        </label>
                        <div className='comment-button-container'>
                            <button id='comment-submit-button' onClick={handleSubmit} >Submit</button>
                        </div>
                    </div>

                </form>)
            }
            {showComments && (
                <div className='comments-display-container'>
                    {showComments && commentsValues?.map(({ answerId, userId, content, User }) => (
                        ((answerId === id) && (
                            <CommentsPage
                                answerId={answerId}
                                userId={userId}
                                content={content}
                                User={User}
                            />
                        )
                        )))}
                </div>
            )}
        </div>
    )
}

export default CommentsForm