import React, { useState, useEffect } from 'react'
import { } from '../../actions'
import { connect } from 'react-redux'
import { getDefaultNormalizer } from '@testing-library/react'
import axiosWithAuth from '../../utils/axiosWithAuth'
import { useParams, Link } from 'react-router-dom'

const UserProfile = props => {
    const { id } = useParams()
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/users/${id}`)
                .then(res => {
                    console.log(res.data, props.user.id)
                    setCurrentUser(res.data)
                })
    }, [])

    return (
        <>
            <Link to={`/profile/${props.user.id}`}>Profile</Link>
            <Link to='/following'>Following</Link>
            <Link to='/explore'>Explore</Link>
            <h1>usr profile</h1>
            <h1>{currentUser.username}</h1>
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        user: state.user,
        users: state.users,
        following: state.following,
        posts: state.posts
    }
}

export default connect(mapStateToProps, { })(UserProfile)