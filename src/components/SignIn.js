import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, register, clearError } from '../actions'
import '../styles/signin.css'
import Loader from 'react-loader-spinner'

const SignIn = props => {
    const location = useLocation()
    const [user, setUser] = useState({
        username: '',
        password: '',
        birthdate: ''
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
        <div className='signDiv'>
            <Link to='/' className='nav home'>Home</Link>
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
                            id='birthdate'
                            type='date'
                            name='birthdate'
                            onChange={handleChanges}
                            value={user.birthdate}
                            placeholder='Birthday'
                        />
                        <button type='submit'>Sign Up</button>
                    </> 
                }
                {props.error == null ? 
                    '' :
                    <ul>
                        <li className='red'>Username must be unique</li>
                        <li className='red'>Password must be 8+ characters</li>
                        <li className='red'>Password must contain a special character</li>
                        <li className='red'>Password must contain a letter</li>
                        <li className='red'>Password must contain a number</li>
                        <button onClick={() => props.clearError()}>Ok</button>
                    </ul>
                }
            </form>
            {location.pathname == '/signin' ? 
                <Link to='/signup' className='nav'>Create Account</Link> :
                <Link to='/signin' className='nav'>Already have an Account</Link>
            }
            {
                props.isLoading ? 
                <Loader type='Bars' /> :
                ''
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

export default connect(mapStateToProps, { login, register, clearError })(SignIn)