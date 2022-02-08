import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getQuestions } from '../../store/question';


import './Home.css'


const HomePage = () => {
    let count = 0
    const dispatch = useDispatch()
    const questionsObj = useSelector((state) => state.questionState.questions)
    const questions = Object.values(questionsObj)
    console.log(questionsObj)

    useEffect(() => {
        dispatch(getQuestions())
    },[]);

    return (
        <div className='home-page-container'>
            <img src="https://i.ytimg.com/vi/x6QYBsUi9rE/maxresdefault.jpg"
                alt='Batman vs Ironman'
                className='home-page-background'
            >
            </img>
            <ol className='home-page-ol'>
                {questions.map(({ id, title, content, userId, User }) => (
                    <li id={`home-page-${count++}`} className={`home-page-li`}>
                        <Link to={`/questions/${id}`} key={id} >{title}
                        </Link>
                        <span>{User?.username}</span>
                    </li>
                ))}
            </ol>
        </div>

    )
}

export default HomePage