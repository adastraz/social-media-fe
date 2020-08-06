import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions'

const SignIn = props => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChanges = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        props.login(user)
    }

    return (
        <div>
            <Link to='/'>Welcome</Link>
            <Link to='/signup'>Create Account</Link>
            <form onSubmit={submitForm}>
                <label htmlFor='username'>Username: </label>
                <input 
                    id='username'
                    type='text'
                    name='username'
                    onChange={handleChanges}
                    value={user.username}
                />
                <input 
                    id='password'
                    type='text'
                    name='password'
                    onChange={handleChanges}
                    value={user.password}
                />
                <button type='submit'>Sign In</button>
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

export default connect(mapStateToProps, { login })(SignIn)