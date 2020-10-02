import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ButtonDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem
} from 'reactstrap'
import { 
    addLike, 
    removeLike,
    addComment,
    addComment1,
    removeComment
} from '../../actions'
import { connect } from 'react-redux'
import axiosWithAuth from '../../utils/axiosWithAuth'

const LoadComments = props => {
    const [current, setCurrent] = useState({})
    const [comments, setComments] = useState([])
    const [modal, setModal] = useState(false)
    const location = useLocation()
    const toggle = () => setModal(!modal)
    const likedPostId = []
    const [newComment, setNewComment] = useState({
        comment: ''
    })

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/posts/${props.post.id}/post`)
                .then(res => {
                    setCurrent(res.data)
                    axiosWithAuth()
                        .get(`/api/comments/${props.post.id}/post`)
                            .then(success => setComments(success.data))
                            .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
    },[])

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
        if (location.pathname.includes('profile')) {
            props.addComment({ comment: newComment.comment, comment_username: props.user.username }, current.id, props.user.id)
        } else {
            props.addComment1({ comment: newComment.comment, comment_username: props.user.username }, current.id, props.user.id)
            toggle()
        }
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
        <div>
            <Button color="danger" onClick={toggle}>Load Comments... [{current.comment_number}]</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <div key={current.id} className='explore'>
                    <ModalHeader>
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
                    </ModalHeader>
                        <ModalBody>
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
                        </ModalBody>
                    </div>
            </Modal>
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

export default connect(mapStateToProps, { removeLike, addLike, addComment, addComment1, removeComment })(LoadComments)