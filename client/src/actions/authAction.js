import {ERR_DISPATCH, REGISTER_DISPATCH, SET_USER} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import isEmpty from '../validation/isEmpty';
import { errorFunction } from './errorAction';


//Register user

export const registerUser = (userData, history) => {
    return(dispatch) => {
    return axios.post('/api/users/register', userData)
        .then(res => {
                dispatch(registerUserSuccess(res.data, history))
                })
        .catch(err =>  {console.log("in dispatch" +err.response);dispatch(errorFunction(err.response));
        //console.log(err.response.data);
    });
    };  
}

export const registerUserSuccess = (user, history) => {
    history.push('/login')
    return {
        type : REGISTER_DISPATCH,
        payload : user
    }
} 






export const loginUser = (userData, history) => {
    return(dispatch) => {
    return axios.post('/api/users/login', userData)
        .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token)
                setAuthToken(token);
                const decoded = jwt_decode(token);
                history.push('/dashboard');
                dispatch(loginUserSuccess(decoded))
                })
        .catch(err =>  dispatch(errorFunction(err.response)));
        //console.log(err.response.data);
         
    }
}

export const loginUserSuccess = (decoded) => {
  
   if(isEmpty(decoded)){
       console.log("in logout");
       window.location.href = "/login";
   }
    return {
        type : SET_USER,
        payload : decoded
    }

}


export const logoutUser = () => {
    return(dispatch) => {
        
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(loginUserSuccess({}));
            
        
        }
}

