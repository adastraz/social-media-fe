import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ButtonDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem
} from 'reactstrap'
import { deletePost, editPost } from '../../actions'

const PostChooser = props => {
    const [modaled, setModaled] = useState(false)
    const toggleed = () => setModaled(!modaled)
    const [modald, setModald] = useState(false)
    const toggled = () => setModald(!modald)
    const [dropdownOpen, setOpen] = useState(false)
    const toggledd = () => setOpen(!dropdownOpen)

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
        props.editPost(props.post.id, newPost)
    }

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggledd}>
        <DropdownToggle caret>
            ...
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem onClick={toggleed}>Edit</DropdownItem>
            <Modal isOpen={modaled} toggle={toggleed}>
                <ModalHeader toggle={toggleed}>Edit Post</ModalHeader>
                <ModalBody>
                    <div className='borderPosts'>
                        <p>{props.post.post}</p>
                        <p>{props.post.location}</p>
                        <p>{props.post.created_at}</p>
                        <p>{props.post.img}</p>
                    </div>
                    <form onSubmit={submitForm} >
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
                        <button type='submit'>Update</button>
                    </form>
                </ModalBody>
            </Modal>
            <DropdownItem onClick={toggled}>Delete</DropdownItem>
            <Modal isOpen={modald} toggle={toggled}>
                <ModalHeader toggle={toggled}>Are you sure?</ModalHeader>
                <ModalBody>
                    <Button color='danger' onClick={() => props.deletePost(props.user.id, {postid: props.post.id})}>Yes</Button>
                    <Button color='primary' onClick={toggled}>No</Button>
                </ModalBody>
            </Modal>
        </DropdownMenu>
        </ButtonDropdown>
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

export default connect(mapStateToProps, { deletePost, editPost })(PostChooser)