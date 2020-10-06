import {
    GET_EVENTS,
    GET_EVENT,
    EVENT_ERROR,
    USER_LOADED,
    GET_PROFILE,
    CUSTOMER_EVENTS_REGISTER,
    CUSTOMER_EVENT_REGISTER,
    CUSTOMERS_EVENT_REGISTER,
    CUSTOMER_EVENT_REGISTER_ERROR,
} from '../actions/types';

const initialState = {
    customerreg: null,
    customersreg: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        // case GET_EVENT:
        // case GET_PROFILE:
        case CUSTOMER_EVENT_REGISTER:
            return {
                ...state,
                customerreg: payload,
                loading: false,
            };
            // case GET_EVENT:
            // case GET_PROFILE:
        case CUSTOMER_EVENTS_REGISTER:
        case CUSTOMERS_EVENT_REGISTER:
            return {
                ...state,
                customersreg: payload,
                loading: false,
            };
        case EVENT_ERROR:
        case CUSTOMER_EVENT_REGISTER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
            // case CLEAR_EVENT:
            //     return {
            //         ...state,
            //         event: null,
            //         loading: false,
            //     };
        default:
            return state;
    }
}