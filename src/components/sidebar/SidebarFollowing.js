import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../styles/sidebar.css'
import { getFollowing, fetchUser, unfollowUser } from '../../actions'
import SidebarPosts from './SidebarPosts.js'
import Unfollow from '../../styles/img/user-remove.svg'
import User from '../../styles/img/user.svg'

const SidebarFollowing = props => {
    const [hide, setHide] = useState(false)
    const [search, setSearch] = useState('')
    const [usersFollowing, setUsersFollowing] = useState([])

    useEffect(() => {
        setUsersFollowing(props.following.filter(user => {
            return user.username.toLowerCase().includes(search.toLowerCase())
        }))
    }, [search])

    // useEffect(() => {
    //     props.fetchUser(props.user.id)
    // }, [])

    return (
        <div className='fullbar'>
            <button className='closer' onClick={() => setHide(!hide)}>-</button>
            <div className={
                hide  ?
                    'fixed sidebarcont hideside' :
                    'fixed sidebarcont'
            }>  
                <h2 className='titleside'>Following</h2>
                <hr></hr>
                <input
                    type='search'
                    onChange={e => setSearch(e.target.value)}
                    placeholder='Search'
                    className='titlesides'
                /> 
                <div className='sidebarover'>
                    {!usersFollowing.length > 0 ?
                        props.following.map(follow => (
                            <div className='sidebarflex'>
                                <div className='userssidebar'>
                                    <Link to={`/friend/${follow.id}`}>
                                        <p className='sidebar'>{follow.username}</p>
                                    </Link>
                                    <img 
                                        src={User} className='sidebar blueunfollow' 
                                        onClick={() => props.unfollowUser(props.user.id, {friend: follow.id})} 
                                        onMouseOut={e => e.currentTarget.src='/static/media/user.ccdb3296.svg'}
                                        onMouseOver={e => e.currentTarget.src='/static/media/user-remove.e0474d32.svg'}
                                    />
                                </div>
                            </div> 
                        )) :
                    usersFollowing.length > 0 ?
                        usersFollowing.map(follow => (
                            <div className='sidebarflex'>
                                <div className='userssidebar'>
                                    <Link to={`/friend/${follow.id}`}>
                                        <p className='sidebar'>{follow.username}</p>
                                    </Link>
                                    <img src={User} className='sidebar blueunfollow'onClick={() => props.unfollowUser(props.user.id, {friend: follow.id})} />
                                </div>
                            </div> 
                        )) :
                        ''
                    }
                </div>
            </div>
            <SidebarPosts history={props.history}/>
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

export default connect(mapStateToProps, { getFollowing, fetchUser, unfollowUser })(SidebarFollowing)