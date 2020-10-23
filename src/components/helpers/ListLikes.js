import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import axiosWithAuth from '../../utils/axiosWithAuth'
import { getFollowing, followUsername, unfollowUsername, redirectUser } from '../../actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Unfollow from '../../styles/img/user-remove.svg'
import User from '../../styles/img/user.svg'
import Follow from '../../styles/img/user-add.svg'

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

    const followerNum = []

    props.following.forEach(follow => {
        followerNum.push(follow.username)
    })

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} id='listlikes'>
            <DropdownToggle id='listlikes' className='listlikes2'>
                Likes: {props.post.like_number}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Likes</DropdownItem>
                <DropdownItem divider />
                {likes.map(user => (
                    <>
                        {followerNum.includes(user.like_username) ? 
                            <div classname='likeflex'>
                                <Link
                                to={`/friend/${user.user_id}`}
                                classname='likename'>
                                    {user.like_username}
                                </Link>
                                <img 
                                    src={User}
                                    className='blueunfollow butbut'
                                    onClick={() => props.unfollowUsername(props.user.id, {friend: user.like_username})}
                                    onMouseOut={e => e.currentTarget.src='/static/media/user.ccdb3296.svg'}
                                    onMouseOver={e => e.currentTarget.src='/static/media/user-remove.e0474d32.svg'}
                                />
                            </div> : 
                        user.like_username == props.user.username ?
                            <Link 
                            to={`/profile/${props.user.id}`}
                            classname='likename'>
                                {user.like_username}
                            </Link> :
                            <div classname='likeflex'>
                                <Link
                                to={`/user/${user.user_id}`}
                                classname='likename'>
                                    {user.like_username}
                                </Link>
                                <img src={Follow} onClick={() => props.followUsername(props.user.id, {friend: user.like_username})} className='redfollow butbut'/>
                            </div>
                        }
                    </>
                ))}
            </DropdownMenu>
        </Dropdown>
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

export default connect(mapStateToProps, { getFollowing, followUsername, unfollowUsername, redirectUser })(ListLikes)