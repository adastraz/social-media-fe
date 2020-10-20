import React, { useState, useEffect } from 'react'
import axiosWithAuth from '../../utils/axiosWithAuth'
import { useParams, Link } from 'react-router-dom'

const OtherAbout = () => {
    const [currentUser, setCurrentUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/users/${id}`)
                .then(res => {
                    setCurrentUser(res.data)
                })
                .catch(err => console.log(err))
    }, [])

    return (
        <div className='aboutcont'>
            <h1>About</h1>
            <p>Bio</p>
            {currentUser.bio == null ? 
                <p>Nothing to display</p> :
                <p>{currentUser.bio}</p>
            }
            <p>Education</p>
            {currentUser.education == null ? 
                <p>Nothing to display</p> :
                <p>{currentUser.education}</p>
            }
        </div>
    )
}

export default OtherAbout