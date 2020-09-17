import React, { useEffect, useState } from 'react'
import PrivateRoute from '../PrivateRoute'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import axiosWithAuth from '../../utils/axiosWithAuth.js'
import Header from '../Header.js'

const Post = props => {
    const { id } = useParams()

    const [current, setCurrent] = useState({})
    const [comments, setComments] = useState([])

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
            {!props.location.state.includes(current.id) ? 
                <a className='like' onClick={() => addLikeHelper(current.id)}>Like</a> :
                <a className='unlike' onClick={() => removeLikeHelper(current.id)}>Unlike</a>
            }
            {comments.map(comment => (
                <p>{comment.comment}</p>
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
export default connect(mapStateToProps, {})(Post)