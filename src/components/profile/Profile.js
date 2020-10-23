import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, useLocation, Link } from 'react-router-dom'
import { fetchUser, 
    getFollowing, 
    fetchUserPosts, 
    postPost, 
    deletePost, 
    fetchUserLikes,
    addLike,
    removeLike,
    addComment
} from '../../actions'
import PostChooser from '../helpers/PostChooser'
import About from './About.js'
import SidebarFollowing from '../sidebar/SidebarFollowing.js'
import ListLikes from '../helpers/ListLikes.js'
import LoadComments from '../helpers/LoadComments.js'
import '../../styles/signin.css'
import '../../styles/post.css'
import '../../styles/profile.css'
import Loader from 'react-loader-spinner'

const Profile = props => {
    const { id } = useParams()
    const likedPostId = []
    const locationz = useLocation()

    useEffect(() => {
        props.fetchUser(id)
        props.fetchUserPosts(id)
        props.fetchUserLikes(id)
        props.getFollowing(id)
    }, [locationz.pathname])

    const [newPost, setNewPost] = useState({
        location: '',
        post: '',
        img: ''
    })

    const [newComment, setNewComment] = useState({
        comment: ''
    })

    const [img, setImg] = useState(false)
    const [location, setLocation] = useState(false) 

    const handleChanges = e => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }

    const handleChangesCom = e => {
        setNewComment({
            ...newComment,
            [e.target.className]: e.target.value
        })
    }

    props.userLikes.forEach(likedposts => {
        likedPostId.push(likedposts.post_id)
    })

    const submitForm = e => {
        e.preventDefault()
        props.postPost(props.user.id, {...newPost, user_id: props.user.id})
    }

    const addLikeHelper = post_id => {
        props.addLike(props.user, post_id)
    }

    const removeLikeHelper = post_id => {
        props.removeLike(props.user, post_id)
    }

    const submitComment = (post_id) => {
        props.addComment({ comment: newComment.comment, comment_username: props.user.username }, post_id, props.user.id)
    }

    return (
        <div className='sidebar'>
            <SidebarFollowing history={props.history}/>
            <div className='profilecontainer'>
                <h1>{props.user.username}</h1>
                <form onSubmit={submitForm} className='postform'>
                    <textarea
                        id='post'
                        name='post'
                        value={newPost.post}
                        placeholder="What's on your mind?"
                        onChange={handleChanges}
                        className='postpost'
                    />
                    {!location ? 
                        <p onClick={() => setLocation(!img)}>Location</p> :
                        <>
                            <input
                                className='locationlocation'
                                id='location'
                                type='text'
                                name='location'
                                value={newPost.location}
                                placeholder='Location'
                                onChange={handleChanges}
                            />
                            <button onClick={() => setLocation(!location)}>Cancel</button>
                        </>
                    }
                    
                    {!img ? 
                        <p onClick={() => setImg(!img)}>Image</p> :
                        <>
                            <input
                                className='locationlocation'
                                id='img'
                                type='text'
                                name='img'
                                value={newPost.img}
                                placeholder='Image link'
                                onChange={handleChanges}
                            />
                            {newPost.img != '' ?
                                <>
                                    <img src={newPost.img} className='postimage' />
                                </> :
                                ''
                            }
                            <button onClick={() => setImg(!img)}>Cancel</button>
                        </>
                    }
                    <button type='submit'>Post</button>
                </form>
                <div className='postabout'>
                    <About />
                    <div className='posts'>
                    <h1>Posts</h1>
                    {
                        props.isLoading ? 
                        <Loader type='Bars' /> :
                        ''
                    }
                    {props.posts.length > 0 ?
                        <div className='postscont'>
                            {props.posts.map(post => (
                                <div key={post.id} className='borderPosts'>
                                    <p>{post.post}</p>
                                    <p>{post.location}</p>
                                    <p>{post.created_at}</p>
                                    {post.img.length > 10 ? 
                                        <img src={post.img} className='postimage'/> :
                                        <p>{post.img}</p>
                                    }
                                    <LoadComments post={post} sidebar={false} username={props.user.username}/>
                                    <ListLikes post={post} /> 
                                    <PostChooser post={post} />
                                    {!likedPostId.includes(post.id) ? 
                                        <a className='like' onClick={() => addLikeHelper(post.id)}>Like</a> :
                                        <a className='unlike' onClick={() => removeLikeHelper(post.id)}>Unlike</a>
                                    }
                                </div>
                            ))}
                        </div> :
                        <p>No posts to display</p>
                    }
                    </div>
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

export default connect(mapStateToProps, { fetchUser, getFollowing, fetchUserPosts, postPost, deletePost, fetchUserLikes, addLike, addComment, removeLike })(Profile)