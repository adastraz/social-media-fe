import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFollowing, unfollowUser } from '../../actions'

const ListFollowing = props => {

    useEffect(() => {
        props.getFollowing(props.user.id)
    }, [])

    return (
        <>
            <h1>Following</h1>
            <hr></hr>
            {props.following.map(follow => (
                <>
                    <Link to={`/friend/${follow.id}`}>
                        <h5>{follow.username}</h5>
                    </Link>
                    <p onClick={() => props.unfollowUser(props.user.id, {friend: follow.id})}>Unfollow</p>
                </> 
            ))}
        </>
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

export default connect(mapStateToProps, { getFollowing, unfollowUser })(ListFollowing)