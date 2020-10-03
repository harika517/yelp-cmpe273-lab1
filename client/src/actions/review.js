import axios from 'axios';
import { GET_REVIEWS, REVIEWS_ERROR, ADD_REVIEWS } from './types';
import { setAlert } from './alert';

//Get posts
export const getReviewsByRestName = (Rest_Name) => async(dispatch) => {
    console.log('inside getReviewsByRestName');
    try {
        const res = await axios.get(
            `http://localhost:3001/restaurant/reviews/${Rest_Name}`
        );
        //console.log(res.data);
        dispatch({
            type: GET_REVIEWS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: REVIEWS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//Write posts
export const addReviews = (formData, Rest_Name) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post(
            `http://localhost:3001/customer/reviews/${Rest_Name}`,
            formData,
            config
        );
        dispatch({
            type: ADD_REVIEWS,
            payload: res.data,
        });
        dispatch(setAlert('Review Added', 'success'));
    } catch (err) {
        dispatch({
            type: REVIEWS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};