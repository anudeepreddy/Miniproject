import axios from '../../axiosconfig';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const REGISTER_USER = "REGISTER_USER";

export const registerUser =  ({
    type: REGISTER_USER
})

export const initialState={}
export const userRegister = (state=initialState,action)=>{
    switch(action.type){
        case REGISTER_USER:{
            return{
                ...state,
            }
        }
        default : return state;
    }
}

export const register = (data) => async()=>{
    axios.post('/api/user/signup', data)
            .then(res => {
                console.log(res);
                const data = res.data;
                if (data.status) {
                    toast.success("Registration successful", {autoClose: 3000});
                    window.location = data.redirect;
                } else {
                    toast.error(data.message, {autoClose: 3000});
                }
            })
            .catch(err => {
                toast.error(err.message, {autoClose: 3000});
            });
}
