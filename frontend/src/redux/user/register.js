import axios from 'axios';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const REGISTER_USER = "REGISTER_USER";

export const registerUser = (status) => ({
    type: REGISTER_USER,
    payload: status
})

export const initialState={
    Registered : false
}

export const userRegister = (state=initialState,action)=>{
    switch(action.type){
        case REGISTER_USER:{
            return{
                ...state,
                Registered:action.payload
            }
        }
        default : return state;
    }
}

export const register = (data) => async(dispatch)=>{
    axios.post('http://localhost:8000/api/user/signup', data)
            .then(res => {
                console.log(res);
                const data = res.data;
                if (data.status) {
                    toast.success("Registration successful", {autoClose: 3000});
                    dispatch(registerUser(true));
                    window.location = data.redirect;
                } else {
                    dispatch(registerUser(false));
                    toast.error(data.message, {autoClose: 3000});
                }
            })
            .catch(err => {
                dispatch(registerUser(false));
                toast.error(err.message, {autoClose: 3000});
            });
}
