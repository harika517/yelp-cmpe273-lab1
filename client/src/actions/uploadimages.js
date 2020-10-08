import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import { POST_IMAGE, IMAGE_ERROR } from './types';

const insertImage = (formData) => async(dispatch) => {
    try {
        console.log('inside insertImage action');
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };
        const res = await axios.post(
            'http://localhost:3001/customer/addphoto',
            formData,
            config
        );
        dispatch({
            type: POST_IMAGE,
            payload: res.data,
        });
        dispatch(setAlert('Profile Created', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: IMAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export default insertImage;