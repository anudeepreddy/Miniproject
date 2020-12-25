import {persistReducer} from 'redux-persist'; 
import storage from 'redux-persist/lib/storage'; 
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {userRegister} from './user/register';
import {userLogin} from './user/login';
import {workspace} from './workspace';


const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const rootReducer= combineReducers(
    {
        userRegister,
        userLogin,
        workspace
    }
);
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store =  createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
