import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getFollowers } from '../../actions'

const ListFollowers = props => {

    useEffect(() => {
        props.getFollowers(props.user.id)
    }, [])

    return (
        <>
            <h1>Followers List</h1>
            {props.followers.map(follow => (
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
        followers: state.followers,
        users: state.users
    }
}

export default connect(mapStateToProps, { getFollowers })(ListFollowers)