import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, followUser, unfollowUser } from '../../actions'
import { Link } from 'react-router-dom'
import SidebarFollowing from '../SidebarFollowing'

const ListUsers = props => {
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
        props.postPost(props.user.id, {...newPost, user_id: props.user.id})
    }

    useEffect(() => {
        props.fetchUsers()
    }, [props.following])
    const followerNum = []

    props.following.forEach(follow => {
        followerNum.push(follow.id)
    })
    
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
                <div className='explore'>
                    <h1>Explore</h1>
                    <hr></hr>
                    {props.users.map(user => (
                        <>
                            {followerNum.includes(user.id) ? 
                                <>
                                    <Link to={`/friend/${user.id}`}>
                                        <h1>{user.username}</h1>
                                        <p>following</p>
                                    </Link>
                                    <button onClick={() => props.unfollowUser(props.user.id, {friend: user.id})}>Unfollow</button>
                                </> : 
                            props.user.id != user.id ?
                                <>
                                    <Link to={`/user/${user.id}`}>
                                        <h1>{user.username}</h1>
                                    </Link>
                                    <button onClick={() => props.followUser(props.user.id, {friend: user.id})}>Follow</button>
                                </> :
                                ''
                            }
                        </>
                    ))}
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
    }
}

export default connect(mapStateToProps, { fetchUsers, followUser, unfollowUser })(ListUsers)