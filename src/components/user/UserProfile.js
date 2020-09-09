import React, { useState, useEffect } from 'react'
import { fetchUserPosts } from '../../actions'
import { connect } from 'react-redux'
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
                .catch(err => console.log(err))
        props.fetchUserPosts(id)
    }, [])

    return (
        <>
            <h1>{currentUser.username}</h1>
            <div>
                {props.posts.map(post => (
                    <div>
                        <p>{post.post}</p>
                        <p>{post.location}</p>
                        <p>{post.created_at}</p>
                        <p>{post.img}</p>
                    </div>
                ))}
            </div>
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

export default connect(mapStateToProps, { fetchUserPosts })(UserProfile)