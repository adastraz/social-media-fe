import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/sidebar.css'
import { unfollowUser } from '../actions'
import axiosWithAuth from '../utils/axiosWithAuth'

const SidebarPosts = props => {
    const [fixed, setFixed] = useState(true) 
    const [maparoo, setMaparoo] = useState(true)
    const [hide, setHide] = useState(false)
    const [search, setSearch] = useState('')
    const [userposts, setUserposts] = useState([])
    const usersFollowing = []
    const [allposts, setAllposts] = useState([])

    // useEffect(() => {
    //     setUsersFollowing(props.following.filter(user => {
    //         return user.username.toLowerCase().includes(search.toLowerCase())
    //     }))
    // }, [search])

    useEffect(() => {
        axiosWithAuth()
            .get('/api/posts')
                .then(res => {
                    setAllposts(res.data)
                })
    }, [])

    useEffect(() => {
        if(props.followingFixed) {
            setFixed(true)
        }
        if(!fixed && props.followingFixed){
            setFixed(true)
        }
    },[props.followingFixed, fixed])

    useEffect(() => {
        setUserposts(allposts.filter(post => {
            return post.username.toLowerCase().includes(search.toLowerCase())
        }))
    }, [search])

    props.following.forEach(follow => {
        usersFollowing.push(follow.id)
    })

    return (
        <div className='postside'>
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
                <h2 className='titleside'>Posts</h2>
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
                        className='titlesides'
                    /> :
                    ''
                }
                <div className='sidebarover'> 
                    {maparoo && !userposts.length > 0 ?
                        allposts.map(post => (
                            <div className='sidebarflex' key={post.id}>
                                <div className='postssidebar'>
                                    {post.user_id == props.user.id ? 
                                        <Link to={`/profile/${post.user_id}`}>
                                            <h4 className='sidebar'>{post.username}</h4>
                                        </Link> :
                                    usersFollowing.includes(post.user_id) ?
                                        <Link to={`/friend/${post.user_id}`}>
                                            <h4 className='sidebar'>{post.username}</h4>
                                        </Link> :
                                        <Link to={`/user/${post.user_id}`}>
                                            <h4 className='sidebar'>{post.username}</h4>
                                        </Link>
                                    }
                                    <p onClick={() => props.history.push(`/post/${post.id}`, props.user.id)}>{post.post}</p>
                                    <h7>{post.created_at}</h7>
                                    {/* <button className='sidebar'onClick={() => props.unfollowUser(props.user.id, {friend: follow.id})}>unfollow</button> */}
                                </div>
                            </div> 
                        )) :
                    maparoo && userposts.length > 0 ?
                        userposts.map(post => (
                            <div className='sidebarflex'>
                                <div className='postssidebar'>
                                    <Link to={`/friend/${post.user_id}`}>
                                        <h4 className='sidebar'>{post.username}</h4>
                                    </Link>
                                    <a>{post.created_at}</a>
                                    <a onClick={() => props.history.push(`/post/${post.id}`, props.user.id)}>{post.post}</a>
                                    {/* <button className='sidebar'onClick={() => props.unfollowUser(props.user.id, {friend: follow.id})}>unfollow</button> */}
                                </div>
                            </div> 
                        )) :
                        ''
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, { unfollowUser })(SidebarPosts)