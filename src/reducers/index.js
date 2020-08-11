import {
    FETCHING_START,
    FETCHING_ERROR,
    FETCHING_SUCCESS_LOGIN,
    CLEAR_ERROR,
    FETCHING_SUCCESS
} from '../actions'

const initialState = {
    isLoading: false,
    error: null,
    user: {},
    friends: [],
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
        default: 
        return state
    }
}