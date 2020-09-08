import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, register } from '../actions'
import '../styles/signin.css'

const SignIn = props => {
    const location = useLocation()
    const [user, setUser] = useState({
        username: '',
        password: '',
        birthday: ''
    })
    

    const handleChanges = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        location.pathname == '/signin' ? props.login(user) : props.register(user)
    }

    return (
        <div>
            <Link to='/' className='nav'>Home</Link>
            <form onSubmit={submitForm}>
                <input 
                    className='signin'
                    id='username'
                    type='text'
                    name='username'
                    onChange={handleChanges}
                    value={user.username}
                    placeholder='Username'
                />
                <input 
                    className='signin'
                    id='password'
                    type='password'
                    name='password'
                    onChange={handleChanges}
                    value={user.password}
                    placeholder='Password'
                />
                {location.pathname == '/signin' ?
                    <button type='submit' className='login'>Login</button> :
                    <>
                        <input 
                            id='birthday'
                            type='date'
                            name='birthday'
                            onChange={handleChanges}
                            value={user.birthday}
                            placeholder='Birthday'
                        />
                        <button type='submit'>Sign Up</button>
                    </> 
                }
            </form>
            {location.pathname == '/signin' ? 
                <Link to='/signup'>Create Account</Link> :
                <Link to='/signin'>Login</Link>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        user: state.user,
        friends: state.friends,
        users: state.users,
        posts: state.posts
    }
}

export default connect(mapStateToProps, { login, register })(SignIn)