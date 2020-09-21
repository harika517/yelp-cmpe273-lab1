//function that takes piece of state that has to do something with alerts and action.

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [
    // {
    //     id: 1,
    //     msg: 'Please log in',
    //     alertType: 'success'
    // }
];

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return [...state, payload]; //payload will have the details above id, msg, alertTyoe
        case REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload); // payload has just id
        default:
            return state;
    }
}