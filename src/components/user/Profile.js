import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchUser } from '../../actions'

const Profile = props => {
    const { id } = useParams()

    useEffect(() => {
        props.fetchUser(id)
    }, [])

    return (
        <>
            <h1>{props.user.username}</h1>
            <Link to='/followers'>Followers</Link>
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        user: state.user,
        followers: state.followers,
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchUser })(Profile)