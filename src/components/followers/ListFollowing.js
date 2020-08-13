import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getFollowing } from '../../actions'

const ListFollowing = props => {

    useEffect(() => {
        props.getFollowing(props.user.id)
    }, [])

    return (
        <>
            <h1>Following</h1>
            <hr></hr>
            {props.following.map(follow => (
                <h1>{follow.username}</h1>
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
        users: state.users
    }
}

export default connect(mapStateToProps, { getFollowing })(ListFollowing)