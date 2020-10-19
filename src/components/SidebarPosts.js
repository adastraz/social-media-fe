import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/sidebar.css'
import { unfollowUser } from '../actions'
import axiosWithAuth from '../utils/axiosWithAuth'
import LoadComments from './user/LoadComments'

const SidebarPosts = props => {
    const [hide, setHide] = useState(false)
    const [search, setSearch] = useState('')
    const [userposts, setUserposts] = useState([])
    const usersFollowing = []
    const [allposts, setAllposts] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('/api/posts')
                .then(res => {
                    setAllposts(res.data)
                })
    }, [])

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
            <div className={
                hide  ?
                    'fixed sidebarcont hideside' :
                    'fixed sidebarcont' 
            }>  
                <h2 className='titleside'>Posts</h2>
                <hr></hr>
                <input
                    type='search'
                    onChange={e => setSearch(e.target.value)}
                    placeholder='Search'
                    className='titlesides'
                /> 
                <div className='sidebarover'> 
                    {!userposts.length > 0 && search.length === 0 ?
                        allposts.map(post => (
                            <div className='sidebarflex' key={post.id}>
                                <div className='postssidebar'>
                                    {post.user_id == props.user.id ? 
                                        <Link to={`/profile/${post.user_id}`}>
                                            <p className='sidebar'>{post.username}</p>
                                        </Link> :
                                    usersFollowing.includes(post.user_id) ?
                                        <Link to={`/friend/${post.user_id}`}>
                                            <p className='sidebar'>{post.username}</p>
                                        </Link> :
                                        <Link to={`/user/${post.user_id}`}>
                                            <p className='sidebar'>{post.username}</p>
                                        </Link>
                                    }
                                    <LoadComments post={post} sidebar={true} username={post.username}/>
                                    <p>{post.created_at}</p>
                                </div>
                            </div> 
                        )) :
                    userposts.length > 0 ?
                        userposts.map(post => (
                            <div className='sidebarflex'>
                                <div className='postssidebar'>
                                    <Link to={`/friend/${post.user_id}`}>
                                        <h4 className='sidebar'>{post.username}</h4>
                                    </Link>
                                    <a>{post.created_at}</a>
                                    <LoadComments post={post} />
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