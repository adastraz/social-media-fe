import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchUser, getFollowing } from '../../actions'
import About from './About.js'

const Profile = props => {
    const { id } = useParams()

    useEffect(() => {
        props.fetchUser(id)
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
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchUser, getFollowing })(Profile)