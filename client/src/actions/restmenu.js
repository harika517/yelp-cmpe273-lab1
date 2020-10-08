import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import {
    GET_MENUITEM,
    GET_MENUITEMS,
    MENUITEM_ERROR,
    UPDATE_MENUITEM,
} from './types';

//Get current Restaurant Menu
///restaurant/menuitems/me
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
        // console.log('error response', err.response);
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

//Get Menu by rest Name
//http://localhost:3000/restaurant/menuitems/Mangoes%20Indian%20Cuisine
export const getMenuByRestName = (Rest_Name) => async(dispatch) => {
    try {
        const res = await axios.get(
            `http://localhost:3001/restaurant/menuitems/${Rest_Name}`
        );
        // console.log(
        //     'inside getCurrentRestMenu, res is ' + JSON.stringify(res.data)
        // );
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

//Get Item details by item Id
//http://localhost:3000/restaurant/menuitems/Mangoes%20Indian%20Cuisine
export const getItemDetailByID = (item_id) => async(dispatch) => {
    try {
        const res = await axios.get(
            `http://localhost:3001/restaurant/menuitems/${item_id}`
        );
        // console.log(
        //     'inside getCurrentRestMenu, res is ' + JSON.stringify(res.data)
        // );
        dispatch({
            type: GET_MENUITEM,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: MENUITEM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// //edit menuitem by item_id
export const editMenuItem = (
    formData,
    item_id,
    history,
    edit = false
) => async(dispatch) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            `http://localhost:3000/restaurant/menuitems/updateitem/${item_id}`,
            formData,
            config
        );
        dispatch({
            type: UPDATE_MENUITEM,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Updated', 'success'));
        if (!edit) {
            history.push('/restaurant/menu');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: MENUITEM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};