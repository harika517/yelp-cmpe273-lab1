import { GET_ORDERS_BY_STATUS, ORDERS_ERROR } from '../actions/types';

const initialState = {
    orders: [],
    order: null,
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ORDERS_BY_STATUS:
            return {
                ...state,
                orders: payload,
                loading: false,
            };
        case ORDERS_ERROR:
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