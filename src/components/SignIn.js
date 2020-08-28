import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, register } from '../actions'

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
            <Link to='/'>Welcome</Link>
            {location.pathname == '/signin' ? 
                <Link to='/signup'>Create Account</Link> :
                <Link to='/signin'>Login</Link>
            }
            <form onSubmit={submitForm}>
                <label htmlFor='username'>Username: </label>
                <input 
                    id='username'
                    type='text'
                    name='username'
                    onChange={handleChanges}
                    value={user.username}
                    placeholder='Username'
                />
                <input 
                    id='password'
                    type='password'
                    name='password'
                    onChange={handleChanges}
                    value={user.password}
                    placeholder='Password'
                />
                {location.pathname == '/signin' ?
                    <button type='submit'>Sign In</button> :
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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        user: state.user,
        friends: state.friends,
        users: state.users
    }
}

export default connect(mapStateToProps, { login, register })(SignIn)