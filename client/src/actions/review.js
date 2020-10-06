import axios from 'axios';
import { GET_REVIEWS, REVIEWS_ERROR, ADD_REVIEWS } from './types';
import { setAlert } from './alert';

//Get posts
export const getReviewsByRestId = (Rest_Id_signup) => async(dispatch) => {
    console.log('inside getReviewsByRestName');
    try {
        const res = await axios.get(
            `http://localhost:3001/restaurant/reviews/${Rest_Id_signup}`
        );
        console.log(res.data);
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
export const addReviews = (
    formData,
    Rest_Id_signup,
    history,
    edit = false
) => async(dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post(
            `http://localhost:3001/customer/reviews/${Rest_Id_signup}`,
            formData,
            config
        );
        dispatch({
            type: GET_REVIEWS,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Review Added' : 'Review Added', 'success'));
        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REVIEWS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};