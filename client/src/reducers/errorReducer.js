import {ERR_DISPATCH} from '../actions/types';

const initialState = {}

export default function(state = initialState, action){
    switch(action.type) {
        case ERR_DISPATCH : return action.payload;
        default : return state;
    }
}