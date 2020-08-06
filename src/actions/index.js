import axios from 'axios'
import history from '../utils/history.js'
export const FETCHING_START = 'FETCHING_START'
export const FETCHING_ERROR = 'FETCHING_ERROR'
export const FETCHING_SUCCESS_LOGIN = 'FETCHING_SUCCESS_LOGIN'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const login = creds => dispatch => {
    dispatch ({ type: FETCHING_START })
    axios
        .post('http://localhost:3300/api/auth/login', creds)
            .then(res => {
                dispatch ({ type: FETCHING_SUCCESS_LOGIN, payload: res.data.user})
                localStorage.setItem('token', res.data.token)
            })
            .catch(err => console.log(err))
}