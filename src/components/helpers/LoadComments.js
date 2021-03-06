import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    DropdownItem
} from 'reactstrap'
import { 
    addLike, 
    removeLike,
    addLike1, 
    removeLike1,
    addComment,
    addComment1,
    removeComment,
    removeComment1,
    deletePost,
    getFollowing
} from '../../actions'
import { connect } from 'react-redux'
import axiosWithAuth from '../../utils/axiosWithAuth'
import Close from '../../styles/img/close.svg'
import Delete from '../../styles/img/delete.svg'
import Check from '../../styles/img/check.svg'
import ListLikes from './ListLikes'

const LoadComments = props => {
    const [current, setCurrent] = useState({})
    const [comments, setComments] = useState([])
    const [modal, setModal] = useState(false)
    const [modald, setModald] = useState(false)
    const toggled = () => setModald(!modald)
    const toggle = () => setModal(!modal)
    const likedPostId = []

    const [newComment, setNewComment] = useState({
        comment: ''
    })

    const followerNum = []

    props.following.forEach(follow => {
        followerNum.push(follow.username)
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
    }, [])

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
        props.addComment1({ comment: newComment.comment, comment_username: props.user.username, user_id: props.user.id }, current.id)
        setComments([
            ...comments, { comment: newComment.comment, comment_username: props.user.username, id: Date.now(), user_id: props.user.id }])
        setNewComment({ comment: '' })
        setCurrent({ ...current, comment_number: current.comment_number+1 })
    }

    const removeCommentHelper = comment_id => {
        props.removeComment1(comment_id, current.id)
        const newarr = comments.filter(comm => comment_id !== comm.id)
        setComments(newarr)
        setCurrent({ ...current, comment_number: current.comment_number-1 })
    }

    const addLikeHelper = post_id => {
        props.addLike1(props.user, post_id)
        likedPostId.push(post_id)
        setCurrent({ ...current, like_number: current.like_number+1 })
    }

    const removeLikeHelper = post_id => {
        props.removeLike1(props.user, post_id)
        likedPostId.filter(like => post_id !== like)
        setCurrent({ ...current, like_number: current.like_number-1 })
    }

    return (
        <div>
            {props.sidebar ?
                <Button color="info" id='sidelc' onClick={toggle}>
                    <p>{props.post.post}</p>
                    {props.post.img != '' ?
                        <img className='postimage2' src={props.post.img} /> : ''
                    }
                </Button> :
                <Button color="danger" onClick={toggle}>Load Comments... [{current.comment_number}]</Button>
            }
            
            <Modal isOpen={modal} toggle={toggle}>
                <div key={current.id} className='explore'>
                    <ModalHeader>
                        <p>{props.username}</p>
                        <p>{current.post}</p>
                        <p>{current.location}</p>
                        <p>{current.created_at}</p>
                        {current.img != '' ? 
                            <img src={current.img} className='postimage'/> :
                            ''
                        }
                        <ListLikes post={current} />
                        {current.user_id == props.user.id ?
                            <>
                                <DropdownItem onClick={toggled}><img src={Delete} /></DropdownItem>
                                <Modal isOpen={modald} toggle={toggled}>
                                    <ModalHeader toggle={toggled}>Are you sure?</ModalHeader>
                                    <ModalBody>
                                        <Button color='danger' onClick={() => props.deletePost(props.user.id, {postid: current.id})}><img src={Check} /></Button>
                                        <Button color='primary' onClick={toggled}><img src={Close} /></Button>
                                    </ModalBody>
                                </Modal>
                            </> :
                            ''
                        }
                        {!likedPostId.includes(current.id) ? 
                            <a className='like' onClick={() => addLikeHelper(current.id)}>Like</a> :
                            <a className='unlike' onClick={() => removeLikeHelper(current.id)}>Unlike</a>
                        }
                    </ModalHeader>
                        <ModalBody>
                            {comments.map(comment => (
                                <>
                                    {followerNum.includes(comment.comment_username) ? 
                                        <div key={comment.id}>
                                            <Link
                                            to={`/friend/${comment.user_id}`}>
                                                {comment.comment_username}
                                            </Link>
                                            <p>{comment.comment}</p>
                                        </div> :
                                    comment.comment_username == props.user.username ?
                                        <div key={comment.id}>
                                            <Link
                                            to={`/profile/${comment.user_id}`}>
                                                {comment.comment_username}
                                            </Link>
                                            <p>{comment.comment}</p>
                                            <img src={Close} onClick={() => removeCommentHelper(comment.id)} />
                                        </div> :
                                        <div key={comment.id}>
                                            <Link
                                            to={`/user/${comment.user_id}`}>
                                                {comment.comment_username}
                                            </Link>
                                            <p>{comment.comment}</p>
                                        </div>
                                    }
                                </>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <form onSubmit={submitComment}>
                                <textarea
                                    className='commentcomment'
                                    id='comment'
                                    name='comment'
                                    value={newComment.comment}
                                    placeholder='Comment on post'
                                    onChange={handleChanges}
                                />
                                <button type='submit'>Post Comment</button>
                            </form>
                        </ModalFooter>
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

export default connect(mapStateToProps, { addLike, removeLike, removeLike1, addLike1, addComment, addComment1, removeComment, removeComment1, deletePost, getFollowing })(LoadComments)