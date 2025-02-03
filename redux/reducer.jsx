/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/auth-slice';
import userInfoReducer from './user-info/user-info-slice';
import invoiceReducer from './invoice/InvoiceSlice';


export const rootReducer = combineReducers({
    auth: authReducer,
    invoice:invoiceReducer,
    userInfo: userInfoReducer,
})