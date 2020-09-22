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

    useEffect(() => {
        console.log(location)
    })

    const { id } = useParams()

    return (
        <>
            {location.pathname === '/following' ? 
                <>
                    <Link to={`/profile/${props.user.id}`} className='nav'>Profile</Link>
                    <Link to='/explore' className='nav'>Explore</Link>
                    <a onClick={() => logout()} className='nav'>Logout</a>
                </> :
                location.pathname === '/explore' ?
                <>
                    <Link to={`/profile/${props.user.id}`} className='nav'>Profile</Link>
                    <Link to='/following' className='nav'>Following</Link>
                    <a onClick={() => logout()} className='nav'>Logout</a>
                </> :
                location.pathname.includes('profile') ?
                <>
                    <Link to='/following' className='nav'>Following</Link>
                    <Link to='/explore' className='nav'>Explore</Link>
                    <a onClick={() => logout()} className='nav'>Logout</a>
                </> :
                location.pathname.includes('friend') ?
                <>  
                    <Link to={`/profile/${props.user.id}`} className='nav'>Profile</Link>
                    <Link to='/following' className='nav'>Following</Link>
                    <Link to='/explore' className='nav'>Explore</Link>
                    <a onClick={() => logout()} className='nav'>Logout</a>
                </> :
                location.pathname.includes('user') ?
                <>  
                    <Link to={`/profile/${props.user.id}`} className='nav'>Profile</Link>
                    <Link to='/following' className='nav'>Following</Link>
                    <Link to='/explore' className='nav'>Explore</Link>
                    <a onClick={() => logout()} className='nav'>Logout</a>
                </> :
                location.pathname.includes('post') ?
                <>  
                    <Link to={`/profile/${props.user.id}`} className='nav'>Profile</Link>
                    <Link to='/following' className='nav'>Following</Link>
                    <Link to='/explore' className='nav'>Explore</Link>
                    <a onClick={() => logout()} className='nav'>Logout</a>
                </> :
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