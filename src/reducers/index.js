import {
    FETCHING_START,
    FETCHING_ERROR,
    FETCHING_SUCCESS_LOGIN,
    CLEAR_ERROR,
    FETCHING_SUCCESS,
    FETCHING_SUCCESS_FOLLOWING,
    FETCHING_SUCCESS_USERS,
    DELETE_POSTS,
    FETCHING_SUCCESS_POSTS,
    FETCHING_SUCCESS_USERLIKES,
    FETCHING_SUCCESS_REDIRECT
} from '../actions'

const initialState = {
    isLoading: false,
    error: null,
    user: {},
    following: [],
    users: [],
    posts: [],
    userLikes: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_START:
            return {
                ...state,
                isLoading: true
            }
        case FETCHING_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case FETCHING_SUCCESS_LOGIN:
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
        case FETCHING_SUCCESS: 
            return {
                ...state,
                isLoading: false
            }
        case FETCHING_SUCCESS_FOLLOWING: 
            return{
                ...state,
                following: action.payload,
                isLoading: false
            }
        case FETCHING_SUCCESS_USERS:
            return {
                ...state,
                users: action.payload,
                isLoading: false
            }
        case DELETE_POSTS:
            return {
                ...state,
                posts: []
            }
        case FETCHING_SUCCESS_POSTS:
            return {
                ...state,
                posts: action.payload,
                isLoading: false
            }
        case FETCHING_SUCCESS_USERLIKES:
            return {
                ...state,
                isLoading: false,
                userLikes: action.payload
            }
        case FETCHING_SUCCESS_REDIRECT:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        default: 
        return state
    }
}