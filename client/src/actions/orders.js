import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import { GET_ORDERS, ORDERS_ERROR, ORDERS_UPDATE } from './types';

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