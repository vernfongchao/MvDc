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


    const shuffle = arr => {

        let index = arr.length;

        while (index != 0){
            let randomIndex = Math.floor(Math.random()*index)
            index--

            [arr[index],arr[randomIndex]] = [arr[randomIndex],arr[index]]
        }

        return arr
    }

    shuffle(questions)
    console.log(questions)

    const questionArr = questions.slice(0,9)


    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch]);

    return (
        <div className='home-page-container'>
            <img src="https://i.ytimg.com/vi/x6QYBsUi9rE/maxresdefault.jpg"
                alt='Batman vs Ironman'
                className='home-page-background'
            >
            </img>
            <img src='../../../images/comic-page-1.jpg'
                className='homepage-ol-background'
            >
            </img>
            <ol className='home-page-ol'>
                {questionArr.map(({ id, title, content, userId, User }) => (
                    <li id={`home-page-${count++}`} className="home-page-li" key={id} >
                        <Link to={`/questions/${id}`} className="questions-detail-link">{title}
                        </Link>
                        <span>{User?.username}</span>
                    </li>
                ))}
            </ol>
        </div>

    )
}

export default HomePage