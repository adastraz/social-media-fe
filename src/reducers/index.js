import {
    FETCHING_START,
    FETCHING_ERROR,
    FETCHING_SUCCESS_LOGIN,
    CLEAR_ERROR,
    FETCHING_SUCCESS,
    FETCHING_SUCCESS_FOLLOWERS
} from '../actions'

const initialState = {
    isLoading: false,
    error: null,
    user: {},
    followers: [],
    users: []
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
        case FETCHING_SUCCESS_FOLLOWERS: 
            return{
                ...state,
                followers: action.payload
            }
        default: 
        return state
    }
}