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
        dispatch(getQuestions())
    }, [dispatch]);



    const questionsArr = Object.values(questions)



    const searchArr = questionsArr.filter(({ title }) => {
        return title.toLowerCase().includes(location.state.detail.toLowerCase())
    })

    console.log('==========================', searchArr)

    return (
        <div className='search-page-container'>
            {searchArr?.map(({ title, id, content }) => (
                <div>
                    <Link to={`questions/${id}`} key={id}>
                        <p>
                            {title}
                        </p>
                    </Link>
                    <p>
                        {content}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default SearchPage