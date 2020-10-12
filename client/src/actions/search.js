import axios from 'axios';
import { SEARCH_RESULT, SEARCH_RESULT_ERROR } from './types';
import { setAlert } from './alert';

//Get posts
export const getRestaurantsByDelivery = () => async(dispatch) => {
    // console.log('inside getReviewsByRestName');
    try {
        const res = await axios.get(
            `http://54.215.250.62:3001/search/delivery/Curbside_PickUp`
        );
        console.log(res.data);
        dispatch({
            type: SEARCH_RESULT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SEARCH_RESULT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const getRestaurantsByDineIn = () => async(dispatch) => {
    // console.log('inside getReviewsByRestName');
    try {
        const res = await axios.get(
            `http://54.215.250.62:3001/search/delivery/Dine_In`
        );
        console.log(res.data);
        dispatch({
            type: SEARCH_RESULT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SEARCH_RESULT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const getRestaurantsByYelpDelivery = () => async(dispatch) => {
    // console.log('inside getReviewsByRestName');
    try {
        const res = await axios.get(
            `http://54.215.250.62:3001/search/delivery/Yelp_Delivery`
        );
        console.log(res.data);
        dispatch({
            type: SEARCH_RESULT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SEARCH_RESULT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const getRestaurantsByInputText = (input_text) => async(dispatch) => {
    console.log('inside getRestaurantsByInputText');
    try {
        const res = await axios.get(
            `http://54.215.250.62:3001/searchresult/restaurants/${input_text}`
        );
        console.log(res.data);
        dispatch({
            type: SEARCH_RESULT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SEARCH_RESULT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};