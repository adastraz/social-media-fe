import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/sidebar.css'
// import ListFollowing from './followers/ListFollowing.js'

const Sidebar = props => {
    return (
        <div className='sidebarcont'>
            <h1>Following</h1>
            <hr></hr>
            {props.following.map(follow => (
                <div className='sidebarflex'>
                    <div className='userssidebar'>
                        <Link to={`/friend/${follow.id}`}>
                            <h4 className='sidebar'>{follow.username}</h4>
                        </Link>
                        <button className='sidebar'onClick={() => props.unfollowUser(props.user.id, {friend: follow.id})}>unfollow</button>
                    </div>
                </div> 
            ))}
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
        posts: state.posts,
        userLikes: state.userLikes
    }
}

export default connect(mapStateToProps, {})(Sidebar)