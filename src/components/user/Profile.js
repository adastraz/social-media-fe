import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchUser, getFollowing } from '../../actions'

const Profile = props => {
    const { id } = useParams()

    useEffect(() => {
        props.fetchUser(id)
        props.getFollowing(id)
    }, [])

    return (
        <>
            <h1>Profile</h1>
            <h1>{props.user.username}</h1>
            <Link to='/following'>Following</Link>
            <Link to='/explore'>Explore</Link>
        </>
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