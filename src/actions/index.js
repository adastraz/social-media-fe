import axios from 'axios'
import axiosWithAuth from '../utils/axiosWithAuth.js'
import history from '../utils/history.js'
export const FETCHING_START = 'FETCHING_START'
export const FETCHING_ERROR = 'FETCHING_ERROR'
export const FETCHING_SUCCESS_LOGIN = 'FETCHING_SUCCESS_LOGIN'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const FETCHING_SUCCESS = 'FETCHING_SUCCESS'
export const FETCHING_SUCCESS_FOLLOWERS = 'FETCHING_SUCCESS_FOLLOWERS'

export const login = creds => dispatch => {
    dispatch ({ type: FETCHING_START })
    axios
        .post('http://localhost:3300/api/auth/login', creds)
            .then(res => {
                dispatch ({ type: FETCHING_SUCCESS_LOGIN, payload: res.data.user })
                localStorage.setItem('token', res.data.token)
                history.push(`/profile/${res.data.user.id}`)
                window.location.reload()
            })
            .catch(err => console.log(err))
}

export const register = creds => dispatch => {
    dispatch({ type: FETCHING_START })
    axios
        .post('http://localhost:3300/api/auth/register', creds)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                dispatch({ type: FETCHING_START })
                axios 
                    .post('http://localhost:3300/api/auth/login', creds)
                        .then(res => {
                            dispatch ({ type: FETCHING_SUCCESS_LOGIN, payload: res.data.user })
                            localStorage.setItem('token', res.data.token)
                            history.push('/followers')
                        })
                        .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const fetchUser = id => dispatch => {
    dispatch ({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/users/${id}`)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS_LOGIN, payload: res.data })
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const getFollowers = id => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/friends/${id}`)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS_FOLLOWERS, payload: res.data })
            })
}