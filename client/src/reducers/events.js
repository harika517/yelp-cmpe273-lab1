import {
    GET_EVENTS,
    GET_EVENT,
    EVENT_ERROR,
    UPDATE_EVENT,
    CLEAR_EVENT,
} from '../actions/types';

const initialState = {
    event: null,
    allevents: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_EVENT:
            return {
                ...state,
                event: payload,
                loading: false,
            };
        case GET_EVENTS:
            return {
                ...state,
                allevents: payload,
                loading: false,
            };
        case EVENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case CLEAR_EVENT:
            return {
                ...state,
                event: null,
                loading: false,
            };
        default:
            return state;
    }
}