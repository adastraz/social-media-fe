import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return (
        <div>
            <h1>Social Media Clone</h1>
            <Link to='/signin'>Sign In</Link>
            <Link to='/signup'>Sign Up</Link>
        </div>
    )
}

export default Welcome