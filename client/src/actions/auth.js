import axios from 'axios';
import { setAlert } from './alert';
import { SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';

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
            'http://localhost:3001/customer/signUP',
            body,
            config
        );

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data,
        });
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