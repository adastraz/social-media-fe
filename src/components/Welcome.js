import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/welcome.css'

const Welcome = () => {
    return (
        <div className='welcomeDiv'>
            <h1>Social Media Clone</h1>
            <div>
                <Link to='/signin' id='nav' className='nav'>Sign In</Link>
                <Link to='/signup' id='nav' className='nav'>Sign Up</Link>
            </div>
        </div>
    )
}

export default Welcome