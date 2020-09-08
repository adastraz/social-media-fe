import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'

const Header = props => {
    const location = useLocation()

    const logout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <>
            {location.pathname === '/following' ? 
                <>
                    <Link to={`/profile/${props.user.id}`}>Profile</Link>
                    <Link to='/explore'>Explore</Link>
                    <button onClick={() => logout()}>Logout</button>
                </> :
                location.pathname === '/explore' ?
                <>
                    <Link to={`/profile/${props.user.id}`}>Profile</Link>
                    <Link to='/following'>Following</Link>
                    <button onClick={() => logout()}>Logout</button>
                </> :
                location.pathname !== '/' && location.pathname !== '/signin' && location.pathname !== '/signup' ?
                    <button onClick={() => logout()}>Logout</button> :
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