import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

//Get current users profile
///customer/profile/:Cust_Id
export const getCurrentProfile = () => async(dispatch) => {
    try {
        const res = await axios.get(
            'http://localhost:3001/customer/profile/basicdetails/me'
        );
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};