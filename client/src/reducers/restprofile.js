import {
    GET_REST_PROFILE,
    REST_PROFILE_ERROR,
    CLEAR_REST_PROFILE,
    UPDATE_REST_PROFILE,
    GET_REST_PROFILES,
} from '../actions/types';

const initialState = {
    rest_profile: null,
    rest_profiles: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_REST_PROFILE:
        case UPDATE_REST_PROFILE:
            return {
                ...state,
                rest_profile: payload,
                loading: false,
            };
        case GET_REST_PROFILES:
            return {
                ...state,
                rest_profiles: payload,
                loading: false,
            };
        case REST_PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case CLEAR_REST_PROFILE:
            return {
                ...state,
                rest_profile: null,
                loading: false,
            };
        default:
            return state;
    }
}