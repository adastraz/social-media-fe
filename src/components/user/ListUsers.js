import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, followUser, unfollowUser, postPost1 } from '../../actions'
import { Link } from 'react-router-dom'
import SidebarFollowing from '../SidebarFollowing'
import Unfollow from '../../styles/img/user-remove.svg'
import User from '../../styles/img/user.svg'
import Follow from '../../styles/img/user-add.svg'

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
                                    </Link>
                                    <img 
                                        src={User}
                                        className='blueunfollow'
                                        onClick={() => props.unfollowUser(props.user.id, {friend: user.id})}
                                        onMouseOut={e => e.currentTarget.src='/static/media/user.ccdb3296.svg'}
                                        onMouseOver={e => e.currentTarget.src='/static/media/user-remove.e0474d32.svg'}
                                    />
                                </> : 
                            props.user.id != user.id ?
                                <>
                                    <Link to={`/user/${user.id}`}>
                                        <h1>{user.username}</h1>
                                    </Link>
                                    <img src={Follow} onClick={() => props.followUser(props.user.id, {friend: user.id})} className='redfollow'/>
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

export default connect(mapStateToProps, { fetchUsers, followUser, unfollowUser, postPost1 })(ListUsers)