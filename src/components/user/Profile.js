import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchUser, getFollowing, fetchUserPosts } from '../../actions'
import About from './About.js'

const Profile = props => {
    const { id } = useParams()

    useEffect(() => {
        props.fetchUser(id)
        props.fetchUserPosts(id)
    }, [])

    return (
        <div>
            <div>
                <Link to='/following'>Following</Link>
                <Link to='/explore'>Explore</Link>
                <h1>Profile</h1>
            </div>
            <div>
                <About />
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
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        user: state.user,
        following: state.following,
        users: state.users,
        posts: state.posts
    }
}

export default connect(mapStateToProps, { fetchUser, getFollowing, fetchUserPosts })(Profile)