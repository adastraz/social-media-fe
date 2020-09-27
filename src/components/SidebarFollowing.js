import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/sidebar.css'
import { getFollowing, fetchUser, unfollowUser } from '../actions'
import SidebarPosts from './SidebarPosts.js'

const SidebarFollowing = props => {
    const [fixed, setFixed] = useState(true) 
    const [maparoo, setMaparoo] = useState(true)
    const [hide, setHide] = useState(false)
    const [search, setSearch] = useState('')
    const [usersFollowing, setUsersFollowing] = useState([])
    const [followers, setFollowers] = useState(false)

    useEffect(() => {
        setUsersFollowing(props.following.filter(user => {
            return user.username.toLowerCase().includes(search.toLowerCase())
        }))
    }, [search])

    useEffect(() => {
        props.fetchUser(props.user.id)
    }, [])

    return (
        <div className='fullbar'>
            <button className='closer' onClick={() => setHide(!hide)}>-</button>
            <button className='closer pin' onClick={() => setFixed(!fixed)}>P</button>
            <button onClick={() => {
                        setMaparoo(!maparoo)
                        setSearch('')
                    }} className='closer view'>V</button>
            <div className={
                hide  ?
                    'fixed sidebarcont hideside' :
                fixed ? 
                    'fixed sidebarcont' : 
                    'scrolly sidebarcont'
            }>  
                {followers ?
                    <h2 onClick={() => setFollowers(false)}>Followers</h2> :
                    <h2 onClick={() => setFollowers(true)}>Following</h2>
                }
                {/* <div className='sidebarbuttons'>   
                    <a onClick={() => {
                        setMaparoo(!maparoo)
                        setSearch('')
                    }} className={fixed ? 'like' : 'unlike'}>View</a>
                    <a onClick={() => setFixed(!fixed)} className={fixed ? 'like' : 'unlike'}>Pin</a>
                </div> */}
                <hr></hr>
                {maparoo ? 
                    <input
                        type='search'
                        onChange={e => setSearch(e.target.value)}
                        placeholder='Search'
                    /> :
                    ''
                }
                <div className='sidebarover'>
                    {maparoo && !usersFollowing.length > 0 ?
                        props.following.map(follow => (
                            <div className='sidebarflex'>
                                <div className='userssidebar'>
                                    <Link to={`/friend/${follow.id}`}>
                                        <h4 className='sidebar'>{follow.username}</h4>
                                    </Link>
                                    <button className='sidebar'onClick={() => props.unfollowUser(props.user.id, {friend: follow.id})}>unfollow</button>
                                </div>
                            </div> 
                        )) :
                    maparoo && usersFollowing.length > 0 ?
                        usersFollowing.map(follow => (
                            <div className='sidebarflex'>
                                <div className='userssidebar'>
                                    <Link to={`/friend/${follow.id}`}>
                                        <h4 className='sidebar'>{follow.username}</h4>
                                    </Link>
                                    <button className='sidebar'onClick={() => props.unfollowUser(props.user.id, {friend: follow.id})}>unfollow</button>
                                </div>
                            </div> 
                        )) :
                        ''
                    }
                </div>
            </div>
            <SidebarPosts followingFixed={fixed} history={props.history}/>
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