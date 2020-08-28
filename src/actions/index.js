import axios from 'axios'
import axiosWithAuth from '../utils/axiosWithAuth.js'
import history from '../utils/history.js'
export const FETCHING_START = 'FETCHING_START'
export const FETCHING_ERROR = 'FETCHING_ERROR'
export const FETCHING_SUCCESS_LOGIN = 'FETCHING_SUCCESS_LOGIN'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const FETCHING_SUCCESS = 'FETCHING_SUCCESS'
export const FETCHING_SUCCESS_FOLLOWING = 'FETCHING_SUCCESS_FOLLOWING'
export const FETCHING_SUCCESS_USERS = 'FETCHING_SUCCESS_USERS'

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

export const fetchUsers = () => dispatch => {
    dispatch ({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/users`)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS_USERS, payload: res.data })
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const getFollowing = id => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/friends/${id}`)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS_FOLLOWING, payload: res.data })
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const followUser = (userid, friendid) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .post(`/api/friends/${userid}`, friendid)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                dispatch({ type: FETCHING_START })
                axiosWithAuth()
                    .get(`/api/friends/${userid}`)
                        .then(res => {
                            dispatch({ type: FETCHING_SUCCESS_FOLLOWING, payload: res.data })
                        })
                        .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
                        })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const unfollowUser = (userid, friendid) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .delete(`/api/friends/${userid}`, { data: friendid })
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                dispatch({ type: FETCHING_START })
                axiosWithAuth()
                    .get(`/api/friends/${userid}`)
                        .then(res => {
                            dispatch({ type: FETCHING_SUCCESS_FOLLOWING, payload: res.data })
                        })
                        .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
                        })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const editProfile = (userid, updates) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .put(`/api/users/${userid}`, updates)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}