import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { 
    addLike, 
    removeLike,
    fetchUser,
    fetchUserLikes,
    fetchUserPosts,
    addComment,
    getFollowing,
    removeComment
} from '../../actions'
import axiosWithAuth from '../../utils/axiosWithAuth.js'
import SidebarFollowing from '../sidebar/SidebarFollowing.js'

const Post = props => {
    const { id } = useParams()

    const [current, setCurrent] = useState({})
    const [comments, setComments] = useState([])
    const likedPostId = []
    const [newComment, setNewComment] = useState({
        comment: ''
    })
    const [newPost, setNewPost] = useState({
        location: '',
        post: '',
        img: ''
    })

    const [img, setImg] = useState(false)
    const [plocation, psetLocation] = useState(false) 

    const handleChangesp = e => {
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

    useEffect(() => {
        console.log(props.user, props.location.state)
        props.fetchUser(props.location.state)
        props.fetchUserPosts(props.location.state)
        props.fetchUserLikes(props.location.state)
        props.getFollowing(props.location.state)
    }, [])

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/posts/${id}/post`)
                .then(res => {
                    setCurrent(res.data)
                    axiosWithAuth()
                        .get(`/api/comments/${id}/post`)
                            .then(success => setComments(success.data))
                })
        console.log('array of liked posts', props.location.state)
    }, []) 

    // useEffect(() => console.log({ comment: newComment.comment, comment_username: props.user.username }, current.id))

    props.userLikes.forEach(likedposts => {
        likedPostId.push(likedposts.post_id)
    })

    const handleChanges = e => {
        setNewComment({
            ...newComment,
            [e.target.name]: e.target.value
        })
    }

    const submitComment = e => {
        e.preventDefault()
        props.addComment({ comment: newComment.comment, comment_username: props.user.username }, current.id, props.user.id)
    }

    const addLikeHelper = post_id => {
        props.addLike(props.user, post_id)
        window.location.reload()
    }

    const removeLikeHelper = post_id => {
        props.removeLike(props.user, post_id)
        window.location.reload()
    }

    return (
        <> 
            <div className='sidebar'>
                <SidebarFollowing history={props.history}/>
                <div className='profilecontainer'>
                    <form onSubmit={submitForm} className='postform'>
                        <input 
                            id='post'
                            type='textbox'
                            name='post'
                            value={newPost.post}
                            placeholder="What's on your mind?"
                            onChange={handleChangesp}
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
                                    onChange={handleChangesp}
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
                                    onChange={handleChangesp}
                                />
                                <button onClick={() => setImg(!img)}>Cancel</button>
                            </>
                        }
                        <button type='submit'>Post</button>
                    </form>
                    <div key={current.id} className='explore'>
                        <p>{current.post}</p>
                        <p>{current.location}</p>
                        <p>{current.created_at}</p>
                        <p>{current.img}</p>
                        
                        <p>Likes: {current.like_number}</p>
                        <button onClick={() => props.deletePost(props.user.id, {postid: current.id})}>x</button>
                        {!likedPostId.includes(current.id) ? 
                            <a className='like' onClick={() => addLikeHelper(current.id)}>Like</a> :
                            <a className='unlike' onClick={() => removeLikeHelper(current.id)}>Unlike</a>
                        }
                        {comments.map(comment => (
                            <div key={comment.id}>
                                <h5>{comment.comment_username}</h5>
                                <p>{comment.comment}</p>
                                {comment.comment_username == props.user.username ? 
                                    <button onClick={() => props.removeComment(comment.id, current.id)}>x</button> :
                                    ''
                                }
                            </div>
                        ))}
                        <form onSubmit={submitComment}>
                            <input
                                id='comment'
                                type='textbox'
                                name='comment'
                                value={newComment.comment}
                                placeholder='Comment on post'
                                onChange={handleChanges}
                            />
                            <button type='submit'>Post Comment</button>
                        </form>
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
        following: state.following,
        users: state.users,
        posts: state.posts,
        userLikes: state.userLikes
    }
}

export default connect(mapStateToProps, { addLike, removeLike, fetchUser, fetchUserLikes, fetchUserPosts, addComment, getFollowing, removeComment })(Post)