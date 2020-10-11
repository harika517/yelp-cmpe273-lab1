import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import { POST_IMAGE, IMAGE_ERROR } from './types';

export const insertImage = (image, Cust_Email) => async (dispatch) => {
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

export const insertRestImage = (image, Rest_email_id) => async (dispatch) => {
  try {
    console.log('inside insertImage action, image is ', image);
    console.log('inside insertImage action, Cust_Email is', Rest_email_id);
    let formData = new FormData();
    formData.append('image', image);
    formData.append('Rest_email_id', Rest_email_id);
    //console.log("inside insertImage action, formData is ", formData); // formData is not console loggable
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const res = await axios
      .post(`http://localhost:3001/restaurant/addphoto/`, formData, config)
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

export const insertItemImage = (image, item_id) => async (dispatch) => {
  try {
    console.log('inside insertItemImage action, image is ', image);
    console.log('inside insertItemImage action, item_id', item_id);
    let formData = new FormData();
    formData.append('image', image);
    formData.append('item_id', item_id);
    //console.log("inside insertImage action, formData is ", formData); // formData is not console loggable
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const res = await axios
      .post(`http://localhost:3001/item/addphoto/${item_id}`, formData, config)
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

// export default insertImage;
