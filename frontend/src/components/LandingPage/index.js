import React from 'react'
import YoutubeBackground from 'react-youtube-background'
import LoginForm from '../LoginForm/LoginForm'
import SignupForm from '../SignupForm/SignupForm'

import './LandingPage.css'

const LandingPage = () => {


    return (
        <YoutubeBackground
            videoId={'UKZ7vxvbOuE'}
        >   
            <div className='landing-page-container'>
                <div className='landing-login-container'>
                    <LoginForm />   
                </div>
                <div className='landing-signup-container'>
                    <SignupForm />   
                </div>
            </div>
        </YoutubeBackground>
    )
}

export default LandingPage

//                 src="https://www.youtube.com/embed/UKZ7vxvbOuE"