import React from 'react'
import YoutubeBackground from 'react-youtube-background'
import LoginForm from '../LoginForm/LoginForm'

import './LandingPage.css'

const LandingPage = () => {

    const VIDEO_WIDTH = 1920;
    const VIDEO_HEIGHT = 1080;

    return (
        <YoutubeBackground
            videoId={'UKZ7vxvbOuE'}
        >   
            <div className='home-page-container'>
                <LoginForm />   

            </div>
            <p>This is working fine</p>
        </YoutubeBackground>
    )
}

export default LandingPage

//                 src="https://www.youtube.com/embed/UKZ7vxvbOuE"