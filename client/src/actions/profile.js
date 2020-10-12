import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  POST_IMAGE,
  GET_PROFILES,
  GET_REST_PROFILE,
  REST_PROFILE_ERROR,
  CLEAR_REST_PROFILE,
  UPDATE_REST_PROFILE,
  GET_REST_PROFILES,
} from './types';

//Get current users profile
///customer/profile/:Cust_Id
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'http://54.215.250.62:3002/customer/profile/me'
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get customer profile by customer name

export const getCustomerProfileByName = (Cust_Name) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://54.215.250.62:3002/customer/profile/${Cust_Name}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.post(
      'http://54.215.250.62:3002/customer/profile/updateprofile/me',
      formData,
      config
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//edit profile
export const editProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.post(
      'http://54.215.250.62:3002/customer/profile/updateprofile/me',
      formData,
      config
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Updated', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/*Edit profile pic*/

export const editProfilePic = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.post(
      'http://54.215.250.62:3002/customer/profile/updateprofile/profilepic/:Cust_email_id',
      formData,
      config
    );
    dispatch({
      type: POST_IMAGE,
      payload: res.data,
    });
    dispatch(setAlert('Profile Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Restaurant User
//get currect restaurant user
export const getCurrentRestProfile = () => async (dispatch) => {
  console.log('inside getcurrentrestprofile');
  try {
    const res = await axios.get(
      'http://54.215.250.62:3002/restaurant/profile/me'
    );
    dispatch({
      type: GET_REST_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REST_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create or update restaurant profile
export const createRestProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.post(
      'http://54.215.250.62:3002/restaurant/profile/updateprofile/me',
      formData,
      config
    );
    dispatch({
      type: GET_REST_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/restaurantdashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REST_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//edit restaurant profile
export const editRestProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.post(
      'http://54.215.250.62:3002/restaurant/profile/updateprofile/me',
      formData,
      config
    );
    dispatch({
      type: UPDATE_REST_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Updated', 'success'));
    if (!edit) {
      history.push('/restaurantdashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REST_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAllRestProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('http://54.215.250.62:3002/restaurant/profile');
    dispatch({
      type: GET_REST_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REST_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getRestByID = (Rest_Id_signup) => async (dispatch) => {
  console.log('getrestbyiis called');
  try {
    const res = await axios.get(
      `http://54.215.250.62:3002/restaurant/profile/${Rest_Id_signup}`
    );
    dispatch({
      type: GET_REST_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REST_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
