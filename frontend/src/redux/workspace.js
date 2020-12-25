import axios from '../axiosconfig';
import {toast} from 'react-toastify';

export const SET_WORKSPACES = "SET_WORKSPACES";

export const setWorkspaces = (workspaces) => ({
    type: SET_WORKSPACES,
    payload: workspaces
})

const initialState = {
    workspaces: [],
    activeWorkspace: null
}

export const workspace = (state=initialState,action)=>{
    const { type, payload } = action;
    switch(type){
        case SET_WORKSPACES:{
            return{
                ...state,
                workspaces : payload
            }
        }
        default : return state;
    }
}

export const createWorkspace = (data) => async(dispatch,getState)=>{
  axios.post('/api/workspace/new',data).then(response => {
      let data = response.data;
      if(data.status){
          console.log(data);
      }
      else{
          console.log("err");
      }
  }).catch(err=>{console.log(err)})
}

export const fetchWorkspaces = () => async(dispatch,getState)=>{
    axios.get('/api/workspace').then(response => {
        let data = response.data;
        if(data.status){
            dispatch(setWorkspaces(data.data));
        }
        else{
            console.log("err");
        }
    }).catch(err=>{console.log(err)})
}