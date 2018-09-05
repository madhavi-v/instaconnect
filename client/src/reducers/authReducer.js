import {ERR_DISPATCH, REGISTER_DISPATCH, SET_USER} from '../actions/types';
import isEmpty from '../validation/isEmpty';

const initialState = {
    isAuthenticated : false,
    user : {}
}

export default function(state = initialState, action){
    switch(action.type) {
        case ERR_DISPATCH : return action.payload;
        
        case REGISTER_DISPATCH : return {
            ...state,
            user : action.payload
        };

        case SET_USER : return {
            ...state,
            isAuthenticated : !isEmpty(action.payload),
            user : action.payload
        }
        default : return state;
    }
}