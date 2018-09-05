import { CREATE_POST, GET_POST } from '../actions/types';

const initialState = {
    post : {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_POST : return {
            ...state,
            post : action.payload
        }
        case GET_POST : return {
            ...state,
            post : action.payload
        }
        default : return state
    }
}