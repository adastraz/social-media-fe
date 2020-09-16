import React, { useState, useEffect } from 'react'
import { fetchUserPosts, addLike, removeLike } from '../../actions'
import { connect } from 'react-redux'
import axiosWithAuth from '../../utils/axiosWithAuth'
import { useParams, Link } from 'react-router-dom'

const UserProfile = props => {
    const { id } = useParams()
    const [currentUser, setCurrentUser] = useState({})
    const likedPostId = []

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/users/${id}`)
                .then(res => {
                    console.log(res.data, props.user.id)
                    setCurrentUser(res.data)
                })
                .catch(err => console.log(err))
        props.fetchUserPosts(id)
    }, [props.userLikes])

    props.userLikes.forEach(likedposts => {
        likedPostId.push(likedposts.post_id)
    })

    return (
        <>
            <h1>{currentUser.username}</h1>
            <div>
                {props.posts.map(post => (
                    <div>
                        <p>{post.post}</p>
                        <p>{post.location}</p>
                        <p>{post.created_at}</p>
                        <p>{post.img}</p>
                        <p>Likes: {post.like_number}</p>
                        {!likedPostId.includes(post.id) ? 
                            <a className='like' onClick={() => props.addLike(props.user, post.id)}>Like</a> :
                            <a className='unlike' onClick={() => props.removeLike(props.user, post.id)}>Unlike</a>
                        }
                    </div>
                ))}
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

export default connect(mapStateToProps, { fetchUserPosts, addLike, removeLike })(UserProfile)