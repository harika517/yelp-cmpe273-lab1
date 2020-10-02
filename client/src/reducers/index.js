import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import events from './events';
import images from './image';
import menu from './menu';

export default combineReducers({
    alert,
    auth,
    profile,
    events,
    images,
    menu,
});