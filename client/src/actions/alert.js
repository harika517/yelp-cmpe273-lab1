import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

//install UUID which gives universal ID on the fly
//thunk middlware
export const setAlert = (msg, alertType) => (dispatch) => {
    const id = uuid();
    // call the reducer alert
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id },
    });
};

//export default setAlert;

//we have the action type call setAlert thats gonna dispatch type of SET_ALERT to the reducer and its gonna add the aler the alert to the state