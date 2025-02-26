import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import {
  GET_EVENTS,
  EVENT_ERROR,
  CUSTOMER_EVENT_REGISTER,
  CUSTOMERS_EVENT_REGISTER,
  CUSTOMER_EVENT_REGISTER_ERROR,
  CUSTOMER_EVENTS_REGISTER,
  GET_CUSTOMER_PROFILE,
} from './types';

//Customer Action
// /customer/registration/:Cust_Name/:Rest_Name/:Event_Name

export const registerEvent = (Cust_Name, Event_Name) => {
  console.log('inside register event, ', Cust_Name, Event_Name);
  try {
    // const config = {
    //     headers: { 'Content-Type': 'application/json' },
    // };
    const res = axios.post(
      `http://54.215.250.62:3002/customer/registration/${Cust_Name}/${Event_Name}`
    );
    // console.log('registerEvent_action called');
    // dispatch({
    //     type: CUSTOMER_EVENT_REGISTER,
    //     payload: res.data,
    // });
    // dispatch(setAlert('Event Registered', 'success'));
    // history.push('/viewevent/:EventName');
    // history.push('/events');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    // dispatch({
    //     type: CUSTOMER_EVENT_REGISTER_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

//get events registered by me

export const getEventsRegisteredByMe = (Cust_Name) => async (dispatch) => {
  console.log('inside getcurrentrestprofile');
  try {
    const res = await axios.get(
      `http://54.215.250.62:3002/customer/registration/${Cust_Name}`
    );
    console.log('inside getEventsRegisteredByMe, ', res.data);
    dispatch({
      type: CUSTOMER_EVENTS_REGISTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_EVENT_REGISTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get all the customers registered for an event

export const getCustomersRegistered = (Event_Name) => async (dispatch) => {
  // console.log('inside getcurrentrestprofile');
  try {
    const res = await axios.get(
      `http://54.215.250.62:3002/restaurant/events/${Event_Name}`
    );
    console.log('inside getEventsRegisteredByMe, ', res.data);
    dispatch({
      type: CUSTOMERS_EVENT_REGISTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_EVENT_REGISTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get customer detail registered
export const getCustomerDetailEvent = (Event_Name, Cust_Name) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `http://54.215.250.62:3002/restaurant/events/${Event_Name}/${Cust_Name}`
    );
    dispatch({
      type: GET_CUSTOMER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CUSTOMER_PROFILE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// export const registerEvent = (Cust_Name, Event_Name) => async(dispatch) => {
//     console.log('registerEvent_action called before');
//     try {
//         // const config = {
//         //     headers: { 'Content-Type': 'application/json' },
//         // };
//         const res = await axios.post(
//             `http://54.215.250.62:3002/customer/registration/${Cust_Name}/${Event_Name}`
//         );
//         console.log('registerEvent_action called');
//         dispatch({
//             type: CUSTOMER_EVENT_REGISTER,
//             payload: res.data,
//         });
//         dispatch(setAlert('Event Registered', 'success'));
//         // history.push('/viewevent/:EventName');
//         // history.push('/events');
//     } catch (err) {
//         const errors = err.response.data.errors;
//         if (errors) {
//             errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//         }
//         dispatch({
//             type: CUSTOMER_EVENT_REGISTER_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status },
//         });
//     }
// };
