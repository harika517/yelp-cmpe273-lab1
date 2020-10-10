import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import { POST_IMAGE, IMAGE_ERROR } from './types';

const insertImage = (image, Cust_Email) => async(dispatch) => {
    try {
        console.log('inside insertImage action, image is ', image);
        console.log('inside insertImage action, Cust_Email is', Cust_Email);
        let formData = new FormData();
        formData.append('image', image);
        formData.append('Cust_Email', Cust_Email);
        //console.log("inside insertImage action, formData is ", formData); // formData is not console loggable
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };
        const res = await axios
            .post(`http://localhost:3001/customer/addphoto/`, formData, config)
            .then((response) => {
                alert('Image uploaded successfully');
                console.log('response is ', response);
            });
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

// const insertImage = (formData) => async(dispatch) => {
//     try {
//         console.log('inside insertImage action');
//         const config = {
//             headers: { 'content-type': 'multipart/form-data' },
//         };
//         const res = await axios.post(
//             'http://localhost:3001/customer/addphoto',
//             formData,
//             config
//         );
//         dispatch({
//             type: POST_IMAGE,
//             payload: res.data,
//         });
//         dispatch(setAlert('Profile Created', 'success'));
//     } catch (err) {
//         const errors = err.response.data.errors;
//         if (errors) {
//             errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//         }
//         dispatch({
//             type: IMAGE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status },
//         });
//     }
// };

export default insertImage;