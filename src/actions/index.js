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
export const DELETE_POSTS = 'DELETE_POSTS'
export const FETCHING_SUCCESS_POSTS = 'FETCHING_SUCCESS_POSTS'
export const FETCHING_SUCCESS_USERLIKES = 'FETCHING_SUCCESS_USERLIKES'
export const FETCHING_SUCCESS_REDIRECT = 'FETCHING_SUCCESS_REDIRECT'

export const login = creds => dispatch => {
    dispatch ({ type: FETCHING_START })
    axios
        .post('https://socialclone1.herokuapp.com/api/auth/login', creds)
            .then(res => {
                dispatch ({ type: FETCHING_SUCCESS_LOGIN, payload: res.data.user })
                localStorage.setItem('token', res.data.token)
                history.push(`/profile/${res.data.user.id}`)
                window.location.reload()
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const register = creds => dispatch => {
    dispatch({ type: FETCHING_START })
    axios
        .post('https://socialclone1.herokuapp.com/api/auth/register', creds)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                dispatch({ type: FETCHING_START })
                axios 
                    .post('https://socialclone1.herokuapp.com/api/auth/login', creds)
                        .then(res => {
                            dispatch ({ type: FETCHING_SUCCESS_LOGIN, payload: res.data.user })
                            localStorage.setItem('token', res.data.token)
                            history.push(`/profile/${res.data.user.id}`)
                            window.location.reload()
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

export const followUsername = (userid, friendid) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .post(`/api/friends/${userid}/byusername`, friendid)
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
                console.log('TYLER ITS HERE', res, friendid, userid)
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

export const unfollowUsername = (userid, friendid) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .delete(`/api/friends/${userid}/byusername`, { data: friendid })
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
                window.location.reload()
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const redirectUser = (username, type, user) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/users/${username}/username`)
            .then(res => {
                history.push(`/${type}/${res.data[0].id}`)
                window.location.reload()
                dispatch({ type: FETCHING_SUCCESS_REDIRECT, payload: user })
                // dispatch({ type: FETCHING_START })
                // axiosWithAuth()
                //     .get(`/api/users/${user.id}`)
                //         .then(res => {
                //             dispatch({ type: FETCHING_SUCCESS_LOGIN, payload: res.data})
                //         })
                //         .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const fetchUserPosts = userid => dispatch => {
    dispatch({ type: FETCHING_START })
    dispatch({ type: DELETE_POSTS })
    axiosWithAuth()
        .get(`/api/posts/${userid}`)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS_POSTS, payload: res.data})
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const postPost = (userid, post) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .post(`/api/posts/${userid}`, post)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                window.location.reload()
            })
}

export const postPost1 = (userid, post) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .post(`/api/posts/${userid}`, post)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
            })
}

export const editPost = (post_id, post) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .put(`/api/posts/${post_id}`, post)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                window.location.reload()
            })
}

export const deletePost = (userid, postid) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .delete(`/api/posts/${userid}`, { data: postid })
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                dispatch({ type: FETCHING_START })
                axiosWithAuth()
                    .get(`/api/posts/${userid}`)
                        .then(res => {
                            dispatch({ type: FETCHING_SUCCESS_POSTS, payload: res.data})
                        })
                        .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const fetchUserLikes = userid => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/likes/${userid}/user`)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS_USERLIKES, payload: res.data})
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const addLike = (user, post_id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .post(`/api/posts/${post_id}/like`, {like_username: user.username, user_id: user.id})
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                dispatch({ type: FETCHING_START })
                axiosWithAuth()
                    .get(`/api/likes/${user.id}/user`)
                        .then(res => {
                            dispatch({ type: FETCHING_SUCCESS_USERLIKES, payload: res.data})
                            window.location.reload()
                        })
                        .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const removeLike = (user, post_id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .delete(`/api/posts/${post_id}/like`, {data: {like_username: user.username}})
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                dispatch({ type: FETCHING_START })
                axiosWithAuth()
                    .get(`/api/likes/${user.id}/user`)
                        .then(res => {
                            dispatch({ type: FETCHING_SUCCESS_USERLIKES, payload: res.data})
                            window.location.reload()
                        })
                        .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const addLike1 = (user, post_id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .post(`/api/posts/${post_id}/like`, {like_username: user.username, user_id: user.id})
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                dispatch({ type: FETCHING_START })
                axiosWithAuth()
                    .get(`/api/likes/${user.id}/user`)
                        .then(res => {
                            dispatch({ type: FETCHING_SUCCESS_USERLIKES, payload: res.data})
                        })
                        .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const removeLike1 = (user, post_id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .delete(`/api/posts/${post_id}/like`, {data: {like_username: user.username}})
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                dispatch({ type: FETCHING_START })
                axiosWithAuth()
                    .get(`/api/likes/${user.id}/user`)
                        .then(res => {
                            dispatch({ type: FETCHING_SUCCESS_USERLIKES, payload: res.data})
                        })
                        .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
            })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const addComment = (comment, post_id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .post(`/api/posts/${post_id}/comment`, comment)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                window.location.reload()
                })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const addComment1 = (comment, post_id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .post(`/api/posts/${post_id}/comment`, comment)
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const removeComment = (commentid, post_id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .delete(`/api/posts/${post_id}/comment`, {data: {comment_id: commentid}})
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                window.location.reload()
                })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const removeComment1 = (commentid, post_id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .delete(`/api/posts/${post_id}/comment`, {data: {comment_id: commentid}})
            .then(res => {
                dispatch({ type: FETCHING_SUCCESS })
                })
            .catch(err => dispatch({ type: FETCHING_ERROR, payload: err }))
}

export const clearError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR })
}