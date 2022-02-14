import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getQuestions } from '../../store/question';

import './ErrorPage.css'

const ErrorPage = () => {
    return (
        
        <div className='error-page-container'>
            <h1 className='error-h1'>Page Not Found</h1>
        </div>
    )
}

export default ErrorPage