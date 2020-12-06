import axios from '../../axiosconfig';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import jwtdecode from 'jwt-decode';

toast.configure();
export const LOGIN_USER = "LOGIN_USER";

export const loginUser = (status) => ({
    type: LOGIN_USER,
    payload: status
})

export const initialState={
    loggedIn : false
}

export const userLogin = (state=initialState,action)=>{
    switch(action.type){
        case LOGIN_USER:{
            return{
                ...state,
                loggedIn : action.payload
            }
        }
        default : return state;
    }
}

export const login = (data) => async(dispatch,getState)=>{
    axios.post('/api/user/login', data)
    .then(res => {
        console.log(res);
        const data = res.data;
        console.log(data);
        if (data.status) {
            localStorage.setItem(' token ', data.accessToken);
            localStorage.setItem(' user ', jwtdecode(data.accessToken).username);
            dispatch(loginUser(true));
            window.location = '/home';
        } else {
            dispatch(loginUser(false));
            toast.warn(data.message, {autoClose: 3000});
        }
    })
    .catch(err => {
        dispatch(loginUser(false));
        toast.error(err.message, {autoClose: 3000});
    });
}

export const checkLogin = () => async(dispatch,getState)=>{
    axios.get('/api/user/isLoggedIn').then(response => {
        let data = response.data;
        if(data.status){
            dispatch(loginUser(true));
        }
        else{
            dispatch(loginUser(false));
        }
    })
}