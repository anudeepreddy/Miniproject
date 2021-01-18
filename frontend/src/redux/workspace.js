import axios from '../axiosconfig';
import {toast} from 'react-toastify';

export const SET_WORKSPACES = "SET_WORKSPACES";
export const SET_ACTIVE_WORKSPACE = "SET_ACTIVE_WORKSPACE";
export const SET_OUTPUT = "SET_OUTPUT"

export const setWorkspaces = (workspaces) => ({
    type: SET_WORKSPACES,
    payload: workspaces
});

export const setActiveWorkspace = (data) => ({
    type: SET_ACTIVE_WORKSPACE,
    payload: data
})

export const setOutput = (data) =>({
    type: SET_OUTPUT,
    payload: data
})

const initialState = {
    workspaces: [],
    activeWorkspace: null,
    output: ""
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
        case SET_ACTIVE_WORKSPACE: {
            return{...state,activeWorkspace:payload}
        }
        case SET_OUTPUT: {
            return{
                ...state,
                output:payload
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

export const fetchWorkspace = (id) => async(dispatch, getState) => {
    axios.get(`/api/workspace/${id}`).then(response => {
        let data = response.data;
        if(data.status){
            dispatch(setActiveWorkspace(data.data));
        } else {
            console.log(data.message);
        }
    }).catch(console.log);
}

export const runCode= (data) => async(dispatch,getState)=>{
    axios.post('/api/workspace/run',data).then(response=>{
        let data = response.data;
        if(data.status){
            dispatch(setOutput(data.data));
        }
        else{
            console.log(data.message);
        }
    })
     .catch(err=>{console.log(err)});
}