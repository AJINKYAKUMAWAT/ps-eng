/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://devproject.co.in/psengg/xadmin/api',
});

// Request interceptor to add apiToken and xAction
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token'); // Retrieve token
    console.log('Retrieved Token:', token); // Debugging log

    config.headers = {
      ...config.headers,
      apiToken: "sxgbwr3h2dwyqcjx7",  // Ensure token is not null
      // xAction: 'getInvoice', // Replace with correct xAction value
    };

    console.log('Final Headers:', config.headers); // Debugging log
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || 'Something went wrong');
  }
);

export default axiosInstance;
