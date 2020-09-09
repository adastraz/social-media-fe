import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchUser, getFollowing, fetchUserPosts, postPost, deletePost } from '../../actions'
import About from './About.js'
import '../../styles/signin.css'
import '../../styles/post.css'

const Profile = props => {
    const { id } = useParams()

    useEffect(() => {
        props.fetchUser(id)
        props.fetchUserPosts(id)
    }, [])

    const [newPost, setNewPost] = useState({
        location: '',
        post: '',
        img: ''
    })

    const [img, setImg] = useState(false)
    const [location, setLocation] = useState(false)

    const handleChanges = e => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        props.postPost(props.user.id, {...newPost, user_id: props.user.id})
    }

    useEffect(() => console.log({...newPost, user_id: props.user.id}))

    return (
        <div>
            <div>
                <h1>{props.user.username}</h1>
            </div>
            <form onSubmit={submitForm} className='postform'>
                <input 
                    id='post'
                    type='textbox'
                    name='post'
                    value={newPost.post}
                    placeholder="What's on your mind?"
                    onChange={handleChanges}
                />
                {!location ? 
                    <p onClick={() => setLocation(!img)}>Location</p> :
                    <>
                        <input
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
                <About />
                <div className='posts'>
                <h1>Posts</h1>
                {props.posts.length > 0 ?
                    <div className='postscont'>
                        {props.posts.map(post => (
                            <div key={post.id}>
                                <p>{post.post}</p>
                                <p>{post.location}</p>
                                <p>{post.created_at}</p>
                                <p>{post.img}</p>
                                <button onClick={() => props.deletePost(props.user.id, {postid: post.id})}>x</button>
                            </div>
                        ))}
                    </div> :
                    <p>No posts to display</p>
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
        posts: state.posts
    }
}

export default connect(mapStateToProps, { fetchUser, getFollowing, fetchUserPosts, postPost, deletePost })(Profile)