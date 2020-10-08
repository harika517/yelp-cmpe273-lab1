import {
    GET_MENUITEM,
    GET_MENUITEMS,
    MENUITEM_ERROR,
    UPDATE_MENUITEM,
} from '../actions/types';

const initialState = {
    menuitem: null,
    allmenuitems: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MENUITEM:
        case UPDATE_MENUITEM:
            return {
                ...state,
                menuitem: payload,
                loading: false,
            };
        case GET_MENUITEMS:
            return {
                ...state,
                allmenuitems: payload,
                loading: false,
            };
        case MENUITEM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
            // case CLEAR_EVENT:
            //     return {
            //         ...state,
            //         event: null,
            //         loading: false,
            //     };
        default:
            return state;
    }
}