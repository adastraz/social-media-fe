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
import { deletePost } from '../../actions'

const PostChooser = props => {
    const [modaled, setModaled] = useState(false)
    const toggleed = () => setModaled(!modaled)
    const [modald, setModald] = useState(false)
    const toggled = () => setModald(!modald)
    const [dropdownOpen, setOpen] = useState(false)
    const toggledd = () => setOpen(!dropdownOpen)

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
                    {props.post.id}
                    {props.post.post}
                </ModalBody>
            </Modal>
            <DropdownItem onClick={toggled}>Delete</DropdownItem>
            <Modal isOpen={modald} toggle={toggled}>
                <ModalHeader toggle={toggled}>Are you sure?</ModalHeader>
                <ModalBody>
                    <Button color='danger' onClick={() => props.deletePost(props.user.id, {postid: props.post.id})}>Yes</Button>
                    <Button color='primary'>No</Button>
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

export default connect(mapStateToProps, { deletePost })(PostChooser)