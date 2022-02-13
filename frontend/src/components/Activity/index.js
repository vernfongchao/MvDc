import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { getQuestions } from '../../store/question';

import './Activity.css'

const Activity = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const questions = useSelector((state) => state.questionState.questions)

    const questionsArr = Object.values(questions)

    const myQuestions = questionsArr.filter(({ userId }) => {
        return userId === user.id
    })

    console.log(user)
    console.log(questionsArr)
    console.log(myQuestions)



    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])


    if (!user) {
        return (<Redirect to='/' />)
    }



    return (
        <div className='search-page-container'>
            <div className='activity-page-header'>
                <h1 className='activity-page-header-text'>My Questions</h1>

            </div>
            <img src="https://wallpaperaccess.com/full/441416.jpg"
                alt='Batman vs Ironman'
                className='home-page-background'
            >
            </img>
            {myQuestions?.map(({ title, id, content }) => (
                <div className='search-detail-outer'>
                    <div className='search-detail-container'>
                        <Link to={`questions/${id}`} key={id}>
                            <p className='search-page-title'>
                                {title}
                            </p>
                        </Link>
                        <p className='search-detail-content'>
                            {content}
                        </p>
                    </div>
                </div>
            ))}
        </div>


    )
}


export default Activity