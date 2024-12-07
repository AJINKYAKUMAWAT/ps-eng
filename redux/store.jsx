import persistReducer from "redux-persist/es/persistReducer";
import { rootReducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';


let persistConfig = {
    key:'root',
    storage:AsyncStorage,
    timeout: 10000,
    blacklist: ['userInfo','auth'],
}

const persistReducerConfig = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistReducerConfig,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Disables the check
        }),
});