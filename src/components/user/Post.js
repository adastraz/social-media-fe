import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { 
    addLike, 
    removeLike,
    fetchUser,
    fetchUserLikes,
    fetchUserPosts,
    addComment
} from '../../actions'
import axiosWithAuth from '../../utils/axiosWithAuth.js'

const Post = props => {
    const { id } = useParams()

    const [current, setCurrent] = useState({})
    const [comments, setComments] = useState([])
    const likedPostId = []
    const [newComment, setNewComment] = useState({
        comment: ''
    })

    useEffect(() => {
        console.log(props.user, props.location.state)
        props.fetchUser(props.location.state)
        props.fetchUserPosts(props.location.state)
        props.fetchUserLikes(props.location.state)
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
        // post comment action (newComment, )
        props.addComment({ comment: newComment.comment, comment_username: props.user.username }, current.id)
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
        <div key={current.id}>
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
            {comments.map(comment => (
                <>
                    <h5>{comment.comment_username}</h5>
                    <p>{comment.comment}</p>
                </>
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
export default connect(mapStateToProps, { addLike, removeLike, fetchUser, fetchUserLikes, fetchUserPosts, addComment })(Post)