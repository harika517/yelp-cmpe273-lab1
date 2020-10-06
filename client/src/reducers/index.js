import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import events from './events';
import images from './image';
import menu from './menu';
import eventregister from './eventregister';
import review from './review';
import order from './orders';
import search from './search';
import custdetail from './custdetail';

export default combineReducers({
    alert,
    auth,
    profile,
    events,
    images,
    menu,
    eventregister,
    review,
    order,
    search,
    custdetail,
});