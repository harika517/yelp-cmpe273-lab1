import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import {
    GET_EVENTS,
    GET_EVENT,
    EVENT_ERROR,
    UPDATE_EVENT,
    CLEAR_EVENT,
} from './types';

//Get all the events by Restaurant Name
///events/Rest_Name
//${Rest_Name}
export const getRestaurantEvents = () => async(dispatch) => {
    try {
        const res = await axios.get(
            `http://54.215.250.62:3001/restaurant/events/me`
        );
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
        const res = await axios.get(`http://54.215.250.62:3001/customer/events`);
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
            'http://54.215.250.62:3001/restaurant/events/me',
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

//View event detail Customer action

export const getEventDetail = (Event_Name) => async(dispatch) => {
    // dispatch({ type: CLEAR_EVENT})
    try {
        const res = await axios.get(
            `http://54.215.250.62:3001/customer/events/eventdetail/${Event_Name}`
        );
        dispatch({
            type: GET_EVENT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//editevent

export const updateEventByName = (
    formData,
    Event_Name,
    history,
    edit = false
) => async(dispatch) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            `http://54.215.250.62:3001/restaurant/events/updateevent/${Event_Name}`,
            formData,
            config
        );
        dispatch({
            type: UPDATE_EVENT,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Updated', 'success'));
        if (!edit) {
            history.push('/restaurantevents');
        }
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