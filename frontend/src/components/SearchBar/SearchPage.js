import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { getQuestions } from '../../store/question';

import './SearchBar.css'



const SearchPage = () => {
    const dispatch = useDispatch()
    const questions = useSelector((state) => state.questionState?.questions)
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [dispatch]);



    const questionsArr = Object.values(questions)



    const searchArr = questionsArr.filter(({ title, content }) => {
        return title.toLowerCase().includes(location.state.detail.toLowerCase())
            || content.toLowerCase().includes(location.state.detail.toLowerCase())
    })


    return (
        <div className='search-page-container'>
            <img src="https://wallpaperaccess.com/full/152832.jpg"
                alt='Batman vs Ironman'
                className='home-page-background'
            >
            </img>
            {searchArr?.map(({ title, id, content }) => (
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

export default SearchPage