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

const getToken = async (credentails) => {
  try {
    if (accessToken && refreshToken) return { accessToken, refreshToken };

    const { data } = await axiosInstance.post(API_ENDPOINT.LOGIN, credentails);
    return data;
  } catch (error) {
    throw error;
  }
};

export const handleLogin =
  (credentails) => async (dispatch) => {
    dispatch(setAuthLoading(true));

    try {
      const loginResponse = await getToken(credentails);
      const userResponse = await getLoggedInUsersDetails();

      dispatch(login({ ...loginResponse }));
      dispatch(
        setUser({
          ...userResponse,
        }),
      );
      await AsyncStorage.setItem('auth', JSON.stringify(true));
      dispatch(setAuthLoading(false));
    } catch (error) {+
      dispatch(handleLogout());
      dispatch(setAuthLoading(false));
      throw error;
    }
  };

export const handleLogout = () => (dispatch) => {
  dispatch(logout());
  dispatch(removeUser());
};