import { SEARCH_RESULT, SEARCH_RESULT_ERROR } from '../actions/types';

const initialState = {
    searchresults: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SEARCH_RESULT:
            return {
                ...state,
                searchresults: payload,
                loading: false,
            };
        case SEARCH_RESULT_ERROR:
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