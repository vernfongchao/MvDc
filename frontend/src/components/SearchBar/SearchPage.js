import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { getQuestions } from '../../store/question';



const SearchPage = () => {
    const dispatch = useDispatch
    const questions = useSelector((state) => state.questionState?.questions)

    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch]);



    const questionsArr = Object.values(questions)

    const location = useLocation()



    console.log('======================', location.state.detail)


    return (
        <div>
            {questionsArr?.map(({ title, id }) => (
                <Link to={`questions/${id}`} key={id}>
                    <p>
                        {title}
                    </p>

                </Link>
            ))}
        </div>
    )
}

export default SearchPage