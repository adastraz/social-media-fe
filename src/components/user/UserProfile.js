import React, { useState, useEffect } from 'react'
import { fetchUserPosts, addLike1, removeLike1, postPost1, fetchUser, followUser, unfollowUser } from '../../actions'
import { connect } from 'react-redux'
import axiosWithAuth from '../../utils/axiosWithAuth'
import { useLocation, useParams, Link } from 'react-router-dom'
import SidebarFollowing from '../SidebarFollowing.js'
import OtherAbout from './OtherAbout'

const UserProfile = props => {
    const { id } = useParams()
    const [currentUser, setCurrentUser] = useState({})
    const location = useLocation()
    const likedPostId = []
    const followingId = []

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/users/${id}`)
                .then(res => {
                    console.log(res.data, props.user.id)
                    setCurrentUser(res.data)
                })
                .catch(err => console.log(err))
        props.fetchUserPosts(id)
    }, [props.userLikes, location])

    useEffect(() => {
        props.fetchUser(props.user.id)
        console.log(props.user)
    }, [])

    // useEffect(() => {
    //     if (!location.pathname.includes(currentUser.id)) {
    //         window.location.reload()
    //     }
    // }, [location])

    const [newPost, setNewPost] = useState({
        location: '',
        post: '',
        img: ''
    })

    const [img, setImg] = useState(false)
    const [plocation, psetLocation] = useState(false) 

    const handleChanges = e => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        props.postPost1(props.user.id, {...newPost, user_id: props.user.id})
        setNewPost({
            location: '',
            post: '',
            img: ''
        })
        setImg(false)
        psetLocation(false)
    }

    props.userLikes.forEach(likedposts => {
        likedPostId.push(likedposts.post_id)
    })

    props.following.forEach(follow => {
        followingId.push(follow.id)
    })  

    console.log('history', props.history)

    return (
        <>
        <div className='sidebar'>
            <SidebarFollowing history={props.history}/>
            <div className='profilecontainer'>
                <h1>{currentUser.username}</h1>
                {followingId.includes(currentUser.id) ? 
                    <button onClick={() => props.unfollowUser(props.user.id, {friend: currentUser.id})}>Unfollow</button> :
                    <button onClick={() => props.followUser(props.user.id, {friend: currentUser.id})}>Follow</button>
                }
                <form onSubmit={submitForm} className='postform'>
                    <input 
                        id='post'
                        type='textbox'
                        name='post'
                        value={newPost.post}
                        placeholder="What's on your mind?"
                        onChange={handleChanges}
                    />
                    {!plocation ? 
                        <p onClick={() => psetLocation(!img)}>Location</p> :
                        <>
                            <input
                                id='location'
                                type='text'
                                name='location'
                                value={newPost.location}
                                placeholder='Location'
                                onChange={handleChanges}
                            />
                            <button onClick={() => psetLocation(!plocation)}>Cancel</button>
                        </>
                    }
                    
                    {!img ? 
                        <p onClick={() => setImg(!img)}>Image</p> :
                        <>
                            <input
                                id='img'
                                type='text'
                                name='img'
                                value={newPost.img}
                                placeholder='Image link'
                                onChange={handleChanges}
                            />
                            <button onClick={() => setImg(!img)}>Cancel</button>
                        </>
                    }
                    <button type='submit'>Post</button>
                </form>
                <div className='postabout'>
                    {/* <About /> */}
                    <OtherAbout />
                    <div className='posts'>
                        <h1>Posts</h1>
                        <div>
                            {props.posts.map(post => (
                                <div>
                                    <p>{post.post}</p>
                                    <p>{post.location}</p>
                                    <p>{post.created_at}</p>
                                    <p>{post.img}</p>
                                    <p onClick={() => props.history.push(`/post/${post.id}`, props.user.id)}>Load comments... [{post.comment_number}]</p>
                                    <p>Likes: {post.like_number}</p>
                                    {!likedPostId.includes(post.id) ? 
                                        <a className='like' onClick={() => props.addLike1(props.user, post.id)}>Like</a> :
                                        <a className='unlike' onClick={() => props.removeLike1(props.user, post.id)}>Unlike</a>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        posts: state.posts,
        userLikes: state.userLikes
    }
}

export default connect(mapStateToProps, { fetchUserPosts, addLike1, removeLike1, postPost1, fetchUser, followUser, unfollowUser })(UserProfile)