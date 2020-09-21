import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

//thunk middlware double arrow function
//install UUID which gives universal ID on the fly
export const setAlert = (msg, alertType) => (dispatch) => {
    const id = uuid.v4();
    // call the reducer alert
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id },
    });
};