import axios from 'axios';
import { setAlert } from './alert';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    GET_EVENTS,
} from './types';
import setAuthToken from '../utils/setAuthToken';
//Load User
export const loadCustomer = () => async(dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('http://54.215.250.62:3001/customer/auth');
        // const res2 = await axios.get('http://54.215.250.62:3001/restaurant/signIn');
        console.log('LoadCoustomer', res.data);
        dispatch({
            type: USER_LOADED,
            payload: res.data,
            // payload_restaurant: res2.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

//Register User
export const signup = ({ Cust_Name, Cust_email_id, Cust_Password }) => async(
    dispatch
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ Cust_Name, Cust_email_id, Cust_Password });

    try {
        const res = await axios.post(
            'http://54.215.250.62:3001/customer/signUP',
            body,
            config
        );

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data,
        });
        dispatch(loadCustomer());
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: SIGNUP_FAIL,
        });
    }
};

//Login User
export const login = (Cust_email_id, Cust_Password) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ Cust_email_id, Cust_Password });

    try {
        const res = await axios.post(
            'http://54.215.250.62:3001/customer/auth',
            body,
            config
        );
        console.log('Printing payload', res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadCustomer());
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

//Logout / Clear profile

export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};

//Load Restaurant User
export const loadRestaurantUser = () => async(dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        console.log('token for rest', localStorage.token);
    }
    try {
        const res = await axios.get('http://54.215.250.62:3001/restaurant/signIn');
        console.log('LoadRestUser', res.data);

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

//Register Restaurant User
export const signupRestaurantUser = ({
    Rest_Name,
    Rest_email_id,
    Rest_Password,
    Rest_location,
}) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({
        Rest_Name,
        Rest_email_id,
        Rest_Password,
        Rest_location,
    });

    try {
        const res = await axios.post(
            'http://54.215.250.62:3001/restaurant/signUP',
            body,
            config
        );

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data,
        });
        dispatch(loadRestaurantUser());
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: SIGNUP_FAIL,
        });
    }
};

//Login Restaurant User
export const loginRestaurantUser = (Rest_email_id, Rest_Password) => async(
    dispatch
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ Rest_email_id, Rest_Password });

    try {
        const res = await axios.post(
            'http://54.215.250.62:3001/restaurant/signIn',
            body,
            config
        );
        console.log('Printing payload', res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadRestaurantUser());
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

//Load Events

// export const loadEvents = () => async(dispatch) => {
//     // if (localStorage.token) {
//     //     setAuthToken(localStorage.token);
//     // }
//     try {
//         const res = await axios.get('http://54.215.250.62:3001/events');
//         console.log('Load Events', res.data);

//         dispatch({
//             type: GET_EVENTS,
//             payload: res.data,
//         });
//     } catch (err) {
//         dispatch({
//             type: AUTH_ERROR,
//         });
//     }
// };