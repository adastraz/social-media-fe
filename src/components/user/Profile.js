import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchUser, getFollowing } from '../../actions'

const Profile = props => {
    const { id } = useParams()

    const [editing, setEditing] = useState(false)

    useEffect(() => {
        props.fetchUser(id)
        setEditUser(props.user)
    }, [])

    const [editUser, setEditUser] = useState({
        username: '',
        bio: 'bio'
    })

    const handleChanges = e => {
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Link to='/following'>Following</Link>
            <Link to='/explore'>Explore</Link>
            <h1>Profile</h1>
            <h1>{props.user.username}</h1>
            {!editing ?
                <div>
                    <button onClick={() => setEditing(!editing)}>edit</button>
                </div> :
                <div>
                    <button onClick={() => setEditing(!editing)}>done</button>
                </div>
            }
            {props.user.bio == null || editing == true ? 
                <>
                    <input
                        id='bio'
                        type='text'
                        name='bio'
                        value={editUser.bio || props.user.bio}
                        placeholder={props.user.bio}
                    />
                </> :
                <>
                    <p>{props.user.bio}</p>
                </>
            }
            {props.user.username == null || editing == true? 
                <>
                    <input
                        id='username'
                        type='text'
                        name='username'
                        value={editUser.username}
                        placeholder={props.user.username}
                        onChange={handleChanges}
                    />
                </> :
                <> 
                    <p>{props.user.username}</p>
                </>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        user: state.user,
        following: state.following,
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchUser, getFollowing })(Profile)