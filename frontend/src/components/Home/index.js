import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getQuestions } from '../../store/question';


import './Home.css'


const HomePage = () => {
    const dispatch = useDispatch()
    const questionsObj = useSelector((state) => state.questionState.questions)
    const questions = Object.values(questionsObj)
    console.log(questionsObj)

    useEffect(() => {
        // 5. Dispatch the return value of the thunk creator instead (the thunk)
        dispatch(getQuestions())
    }, [dispatch]);

    return (
        <>

            <img src="https://i.ytimg.com/vi/x6QYBsUi9rE/maxresdefault.jpg"
                alt='Batman vs Ironman'
                className='home-page-background'
            >
            </img>
            <ol className='home-page-ul'>

                {questions.map(({ id, title, content, userId }) => (
                    <Link content={content} title={title} to={`/questions/${id}`} >{title}

                    </Link>
                ))}

            </ol>
        </>

    )
}

export default HomePage