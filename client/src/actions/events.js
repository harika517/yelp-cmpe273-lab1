import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import { GET_EVENTS, GET_EVENT, EVENT_ERROR, CLEAR_EVENT } from './types';

//Get all the events by Restaurant Name
///events/Rest_Name
//${Rest_Name}
export const getRestaurantEvents = () => async(dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/restaurant/events/me`);
        dispatch({
            type: GET_EVENTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//Get all the events
//  /events

export const getAllEvents = () => async(dispatch) => {
    // dispatch({ type: CLEAR_EVENT})
    try {
        const res = await axios.get(`http://localhost:3001/customer/events`);
        dispatch({
            type: GET_EVENTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//create or update profile
export const createEvent = (formData, history) => async(dispatch) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            'http://localhost:3001/restaurant/events/me',
            formData,
            config
        );
        dispatch({
            type: GET_EVENT,
            payload: res.data,
        });
        dispatch(setAlert('Event Created', 'success'));
        history.push('/restaurantevents');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};