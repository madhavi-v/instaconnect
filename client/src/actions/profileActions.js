import axios from 'axios';
import { CREATE_PROFILE, CLEAR_CURRENT_PROFILE } from './types';
import { errorFunction } from './errorAction';

//Create profile

export const userProfile = (userData) => {
    return(dispatch) => {
        return axios.post('/api/profiles/', userData)
            .then(res => {
                    dispatch(profileCreateSuccess(res.data))
                    })
            .catch(err =>  {console.log("in dispatch" +err.response);dispatch(errorFunction(err.response));
            //console.log(err.response.data);
        });
        };  
}

export const profileCreateSuccess = (userData) => {
    return {
        type : CREATE_PROFILE,
        payload : userData
    }
}

export const clearCurrentProfile = () => {
    return {
      type: CLEAR_CURRENT_PROFILE
    };
  };