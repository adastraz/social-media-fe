import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, followUser, unfollowUser } from '../../actions'

const ListUsers = props => {

    useEffect(() => {
        props.fetchUsers()
    }, [props.following])
    const followerNum = []

    props.following.forEach(follow => {
        followerNum.push(follow.id)
    })
    
    return (
        <> 
            <h1>Explore</h1>
            <hr></hr>
            {props.users.map(user => (
                <>
                    {followerNum.includes(user.id) ? 
                    <>
                        <h1>{user.username}</h1>
                        <p>following</p>
                        <button onClick={() => props.unfollowUser(props.user.id, {friend: user.id})}>Unfollow</button>
                    </> : 
                    props.user.id != user.id ?
                        <>
                            <h1>{user.username}</h1>
                            <button onClick={() => props.followUser(props.user.id, {friend: user.id})}>Follow</button>
                        </> :
                        ''
                    }
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
        users: state.users,
        following: state.following,
    }
}

export default connect(mapStateToProps, { fetchUsers, followUser, unfollowUser })(ListUsers)