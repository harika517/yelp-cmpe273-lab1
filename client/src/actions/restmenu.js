import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import { GET_MENUITEM, GET_MENUITEMS, MENUITEM_ERROR } from './types';

//Get current users profile
///customer/profile/:Cust_Id
export const getCurrentRestMenu = () => async(dispatch) => {
    try {
        const res = await axios.get(
            'http://localhost:3001/restaurant/menuitems/me'
        );
        console.log(
            'inside getCurrentRestMenu, res is ' + JSON.stringify(res.data)
        );
        dispatch({
            type: GET_MENUITEMS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_MENUITEMS,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//create or update profile
export const createRestaurantMenuItem = (formData, history) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            'http://localhost:3001/restaurant/menuitems/me',
            formData,
            config
        );
        dispatch({
            type: GET_MENUITEM,
            payload: res.data,
        });
        dispatch(setAlert('Profile Created', 'success'));
        history.push('/restaurant/menu');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: GET_MENUITEM,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// //edit profile
// export const editProfile = (formData, history, edit = false) => async(
//     dispatch
// ) => {
//     try {
//         const config = {
//             headers: { 'Content-Type': 'application/json' },
//         };
//         const res = await axios.post(
//             'http://localhost:3001/customer/profile/updateprofile/me',
//             formData,
//             config
//         );
//         dispatch({
//             type: GET_PROFILE,
//             payload: res.data,
//         });
//         dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Updated', 'success'));
//         if (!edit) {
//             history.push('/dashboard');
//         }
//     } catch (err) {
//         const errors = err.response.data.errors;
//         if (errors) {
//             errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//         }
//         dispatch({
//             type: PROFILE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status },
//         });
//     }
// };