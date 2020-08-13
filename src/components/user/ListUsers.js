import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../actions'

const ListUsers = props => {

    useEffect(() => {
        props.fetchUsers()
    }, [])

    return (
        <> 
            <h1>Explore</h1>
            <hr></hr>
            {props.users.map(user => (
                <h1>{user.username}</h1>
            ))}
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
    }
}

export default connect(mapStateToProps, { fetchUsers })(ListUsers)