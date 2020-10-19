import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'
import '../styles/signin.css'

const Header = props => {
    const location = useLocation()

    const logout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    const { id } = useParams()

    return (
        <>
            {location.pathname === '/following' ? 
                <div className='head'>
                    <Link to={`/profile/${props.user.id}`} id='nav' className='nav'>Profile</Link>
                    <Link to='/explore' id='nav' className='nav'>Explore</Link>
                    <Link onClick={() => logout()} className='nav'>Logout</Link>
                </div> :
                location.pathname === '/explore' ?
                <div className='head'>
                    <Link to={`/profile/${props.user.id}`} id='nav' className='nav'>Profile</Link>
                    <Link onClick={() => logout()} id='nav' className='nav'>Logout</Link>
                </div> :
                location.pathname.includes('profile') ?
                <div className='head'>
                    <Link to='/explore' id='nav' className='nav'>Explore</Link>
                    <Link onClick={() => logout()} id='nav' className='nav'>Logout</Link>
                </div> :
                location.pathname.includes('friend') ?
                <div className='head'>  
                    <Link to={`/profile/${props.user.id}`} id='nav' className='nav'>Profile</Link>
                    <Link to='/explore' id='nav' className='nav'>Explore</Link>
                    <Link id='nav' onClick={() => logout()} className='nav'>Logout</Link>
                </div> :
                location.pathname.includes('user') ?
                <div className='head'>  
                    <Link to={`/profile/${props.user.id}`} id='nav' className='nav'>Profile</Link>
                    <Link to='/explore' id='nav' className='nav'>Explore</Link>
                    <Link id='nav' onClick={() => logout()} className='nav'>Logout</Link>
                </div> :
                location.pathname.includes('post') ?
                <div className='head'>  
                    <Link to={`/profile/${props.user.id}`} id='nav' className='nav'>Profile</Link>
                    <Link to='/explore' id='nav' className='nav'>Explore</Link>
                    <Link id='nav' onClick={() => logout()} className='nav'>Logout</Link>
                </div> :
                ''
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        users: state.users,
        user: state.user,
        following: state.following,
        posts: state.posts
    }
}

export default connect(mapStateToProps, { fetchUser })(Header)