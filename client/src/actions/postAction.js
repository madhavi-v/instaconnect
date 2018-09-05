import axios from 'axios';
import { CREATE_POST,GET_POST } from './types';

//Create post

export const createPost = (postData) => {
    return(dispatch) => {
        return axios.post('/api/posts/', postData)
            .then(res => {
                    dispatch(postCreateSuccess(res.data))
                    })
            
        };  
}

export const postCreateSuccess = (postData) => {
    return {
        type : CREATE_POST,
        payload : postData
    }
}

export const getPost = (handle) => {
    return(dispatch) => {
        return axios.get('/api/posts', handle)
            .then(res => {
                dispatch(getPostSuccess(res))
            })
    };
}

export const getPostSuccess = (res) => {
    return {
        type : GET_POST,
        payload : res.data
    }
}