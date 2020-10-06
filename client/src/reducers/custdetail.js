import {
    GET_CUSTOMER_PROFILE,
    GET_CUSTOMER_PROFILE_ERROR,
} from '../actions/types';

const initialState = {
    customer_profile: null,
    // profiles: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CUSTOMER_PROFILE:
            return {
                ...state,
                customer_profile: payload,
                loading: false,
            };
        case GET_CUSTOMER_PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
            // case CLEAR_PROFILE:
            //     return {
            //         ...state,
            //         customer_profile: null,
            //         loading: false,
            //     };
        default:
            return state;
    }
}