import axios from 'axios';
import { format } from 'mysql';
import { setAlert } from './alert';
import {
    CUSTOMER_EVENT_REGISTER,
    CUSTOMERS_EVENT_REGISTER,
    CUSTOMER_EVENT_REGISTER_ERROR,
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
            `http://localhost:3001/customer/registration/${Cust_Name}/${Event_Name}`
        );
        console.log('registerEvent_action called');
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

// export const registerEvent = (Cust_Name, Event_Name) => async(dispatch) => {
//     console.log('registerEvent_action called before');
//     try {
//         // const config = {
//         //     headers: { 'Content-Type': 'application/json' },
//         // };
//         const res = await axios.post(
//             `http://localhost:3001/customer/registration/${Cust_Name}/${Event_Name}`
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