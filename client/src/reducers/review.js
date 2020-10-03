import { GET_REVIEWS, REVIEWS_ERROR, ADD_REVIEWS } from '../actions/types';

const initialState = {
    reviews: [],
    review: null,
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_REVIEWS:
            return {
                ...state,
                reviews: payload,
                loading: false,
            };
        case ADD_REVIEWS:
            return {
                ...state,
                reviews: [...state.reviews, payload],
                loading: false,
            };
        case REVIEWS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}