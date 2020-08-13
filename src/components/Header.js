import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'

const Header = props => {
    const location = useLocation()

    return (
        <>
            {location.pathname == '/following' ? 
                <>
                    <Link to={`/profile/${props.user.id}`}>Profile</Link>
                    <Link to='/explore'>Explore</Link>
                </> :
                location.pathname == '/explore' ?
                <>
                    <Link to={`/profile/${props.user.id}`}>Profile</Link>
                    <Link to='/following'>Following</Link>
                </> :
                location.pathname == '/' ? 
                <>
                    <p>testing</p>
                </> :
                location.pathname == '/signup' ?
                <>  
                    <p>signup</p>
                </> :
                location.pathname == '/signin' ?
                <>  
                    <p>signin</p>
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
        following: state.following
    }
}

export default connect(mapStateToProps, { fetchUser })(Header)