import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import {
    GET_ORDERS,
    ORDERS_ERROR,
    ORDERS_UPDATE,
    CREATE_ORDER,
    GET_ORDER,
} from './types';

//Create orders by restaurants
//change this
export const createOrder = (formData, history, edit = false) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            `http://localhost:3001/customer/orders/me/:Rest_Name`,
            formData,
            config
        );
        dispatch({
            type: CREATE_ORDER,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//get all the orders by restaurant name
export const getOrdersByRestName = () => async(dispatch) => {
    //console.log('inside getcurrentrestprofile');
    try {
        const res = await axios.get('http://localhost:3000/restaurant/orders');
        dispatch({
            type: GET_ORDERS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//Update orders by restaurant
export const updateOrdersByOrderId = (formData, order_id) => async(
    dispatch
) => {
    //console.log('inside getcurrentrestprofile');
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.get(
            `http://localhost:3001/restaurant/orders/update/${order_id}`,
            formData,
            config
        );
        dispatch({
            type: ORDERS_UPDATE,
            payload: res.data,
        });
        dispatch(setAlert('Order Updated', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const getOrdersByOrdeId = (order_id) => async(dispatch) => {
    //console.log('inside getcurrentrestprofile');
    try {
        const res = await axios.get(
            `http://localhost:3001/restaurant/orders/orderdetail/${order_id}`
        );
        dispatch({
            type: GET_ORDER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};