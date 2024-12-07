import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/auth-slice';
import userInfoReducer from './user-info/user-info-slice';


export const rootReducer = combineReducers({
    auth: authReducer,
    userInfo: userInfoReducer,
})