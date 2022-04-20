import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';


import './Activity.css'

const Activity = () => {
    const user = useSelector((state) => state.session.user)
    const questions = useSelector((state) => state.questionState.questions)

    const questionsArr = Object.values(questions)

    const myQuestions = questionsArr.filter(({ userId }) => {
        return userId === user.id
    })

    

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
                <div className='search-detail-outer' key={id}>
                    <div className='search-detail-container' >
                        <Link to={`questions/${id}`} className='search-page-question-links'>
                            <span className='search-page-title'>
                                {title}
                            </span>
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