import { createSlice } from '@reduxjs/toolkit';
import {
  getLoggedInUsersDetails,
  removeUser,
  setUser,
} from '../user-info/user-info-slice';
import axiosInstance from '../../utils/axios';
import { API_ENDPOINT } from '../../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isAuthenticated: false,
  accessToken: '',
  loading: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = '';
      state.isAuthenticated = false;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setAuthLoading, login, logout, setInitialized } =
  authSlice.actions;
export default authSlice.reducer;

const getToken = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINT.LOGIN,
      {}, // Pass an empty body since the parameters are in headers
      {
        headers: {
          userName: credentials.userName,
          password: credentials.password,
          xAction: 'generateToken',
        },
      }
    );
    console.log("response",response)
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};


export const handleLogin =
  (credentials) => async (dispatch) => {
    dispatch(setAuthLoading(true));
    try {
      const loginResponse = await getToken(credentials);

      if (loginResponse.err === 0) {
        const { apiToken, apiTokenExpiry } = loginResponse.data;

        // Dispatch login and set user details
        dispatch(
          login({
            accessToken: apiToken,
          })
        );

        dispatch(
          setUser({
            apiTokenExpiry,
          })
        );

        await AsyncStorage.setItem(
          'auth',
          JSON.stringify({
            isAuthenticated: true,
            accessToken: apiToken,
          })
        );

        dispatch(setAuthLoading(false));
      } else {
        throw new Error(loginResponse.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch(handleLogout());
      dispatch(setAuthLoading(false));
      throw error;
    }
  };


export const handleLogout = () => (dispatch) => {
  dispatch(logout());
  dispatch(removeUser());
};