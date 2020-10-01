import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import events from './events';
import images from './image';

export default combineReducers({
    alert,
    auth,
    profile,
    events,
    images,
});