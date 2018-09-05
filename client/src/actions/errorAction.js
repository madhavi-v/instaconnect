import {ERR_DISPATCH} from './types';




export const errorFunction = (res) => {
    return {
        type : ERR_DISPATCH,
        payload : res.data
    }
}