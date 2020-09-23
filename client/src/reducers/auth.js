//Registration making calls to backend and verifying authentication
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_LOADED,
    AUTH_ERROR,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null, //true on successful registeration/loggedin
    loading: true, // get response from backedn it will be false after getting data
    user: null, //name , email, avatar
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                customer: payload,
            };
        case SIGNUP_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case SIGNUP_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}