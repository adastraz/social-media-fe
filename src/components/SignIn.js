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

    const [confirm, setConfirm] = useState({
        password: ''
    })
    const [length, setLength] = useState(false)
    const [number, setNumber] = useState(false)
    const [special, setSpecial] = useState(false)
    const [letter, setLetter] = useState(false)
    const [actLen, setActLen] = useState(0)
    const [unmatching, setUnmatching] = useState(true)

    const numbers = ['1','2','3','4','5','6','7','8','9']
    const specialCharacters = ['[','#','?','!','@','$','%','^','&','-',']']
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

    const handleChanges = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleChangesconfirm = e => {
        setConfirm({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()

        location.pathname == '/signin' ? props.login(user) : props.register(user)
    }

    useEffect(() => {
        if (actLen > user.password.length && number == true || special == true) {
            setNumber(false)
            setSpecial(false)
            setLetter(false)
        } 
        setActLen(user.password.length)

        if (user.password.length > 7) {
            setLength(true)
        } else {
            setLength(false)
        }

        for(let i=0; i<user.password.length; i++){
            if (letters.includes(user.password[i])) {
                setLetter(true)
            } else if (((i+1) == user.password.length) && letter == false){
                setLetter(false)
            } 
        }

        for(let i=0; i<user.password.length; i++){
            if (numbers.includes(user.password[i])) {
                setNumber(true)
            } else if (((i+1) == user.password.length) && number == false){
                setNumber(false)
            } 
        }

        for(let i=0; i<user.password.length; i++){
            if (specialCharacters.includes(user.password[i])) {
                setSpecial(true)
            } else if (((i+1) == user.password.length) && special == false){
                setSpecial(false)
            } 
        }
        if (location.pathname == '/signup' && user.password == confirm.password) {
            setUnmatching(true)
        } else{
            setUnmatching(false)
        }
    }, [user.password, confirm.password])

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
                            className='signin'
                            id='password'
                            type='password'
                            name='password'
                            onChange={handleChangesconfirm}
                            value={confirm.password}
                            placeholder='Confirm Password'
                        />
                        <input 
                            id='birthdate'
                            type='date'
                            name='birthdate'
                            onChange={handleChanges}
                            value={user.birthdate}
                            placeholder='Birthday'
                        />
                        {unmatching && length && number && special && letter ?
                            <button type='submit'>Sign Up</button> :
                            <a className='red'>Requirements not met</a>
                        }
                    </> 
                }
                {length ?
                    <p className='green'>Meets length requirement (8 char+)</p> : 
                    <p className='red'>Must be longer than 8 characters</p>
                }
                {number ?
                    <p className='green'>Has at least 1 number</p> : 
                    <p className='red'>Must have at least one number</p>
                }
                {special ?
                    <p className='green'>Has at least 1 special character</p> : 
                    <p className='red'>Must have at least one special character</p>
                }
                {letter ?
                    <p className='green'>Has at least 1 letter</p> : 
                    <p className='red'>Must have at least one letter</p>
                }
                {location.pathname == '/signup' ?
                    unmatching ?
                        <p className='green'>passwords match</p> : 
                        <p className='red'>passwords do not match</p> :
                    ''
                }
                {/* {props.error == null ? 
                    '' :
                    <ul>
                        <li className='red'>Username must be unique</li>
                        <li className='red'>Password must be 8+ characters</li>
                        <li className='red'>Password must contain a special character</li>
                        <li className='red'>Password must contain a letter</li>
                        <li className='red'>Password must contain a number</li>
                        <button onClick={() => props.clearError()}>Ok</button>
                    </ul>
                } */}
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