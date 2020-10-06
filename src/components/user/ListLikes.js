import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import axiosWithAuth from '../../utils/axiosWithAuth'

const ListLikes = props => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [likes, setLikes] = useState([])
    const toggle = () => setDropdownOpen(prevState => !prevState)

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/likes/${props.post.id}/post`)
                .then(res => {
                    setLikes(res.data)
                })
    },[])

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} id='listlikes'>
            <DropdownToggle id='listlikes' className='listlikes2'>
                Likes: {props.post.like_number}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Likes</DropdownItem>
                <DropdownItem divider />
                {likes.map(like => (
                    <p>{like.like_username}</p>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

export default ListLikes