import axios from 'axios';
  import { API_ENDPOINT, BASE_URL, ERROR_MESSAGES, MAX_RETRIES } from './constant';
  
  const axiosInstance = axios.create({
    baseURL: BASE_URL || '',
  });

  
  let retryCount = 0;
  
  axiosInstance.interceptors.response.use(
    async (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Skip token refresh if the request is for login
      if (originalRequest?.url?.includes('login')) {
        return Promise.reject(error); // Skip retry logic for login requests
      }
  
      if (
        error.response?.status === 401 &&
        retryCount < MAX_RETRIES &&
        error.response.config.url &&
        !error.response.config.url.includes('login')
      ) {
        retryCount++;
        try {
          const { accessToken, refreshToken } = await getRefreshToken();
  
          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      } else {
        return Promise.reject(
          (error.response && error.response.data) ||
            ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        );
      }
    },
  );
  
  async function getRefreshToken() {
    try {
      const response = await axiosInstance.get(API_ENDPOINT.REFRESH_TOKEN);
  
      const { accessToken, refreshToken } = response.data;
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
  
  axiosInstance.interceptors.response.use(
    async (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (
        error.response?.status === 401 &&
        error.response.config.url &&
        !error.response.config.url.includes('login')
      ) {
        retryCount++;
        try {
          const { accessToken, refreshToken } = await getRefreshToken();

          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return axiosInstance(originalRequest);
        } catch (refreshError) {
      
          return Promise.reject(refreshError);
        }
      } else {
       
        return Promise.reject(
          (error.response && error.response.data) ||
            ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        );
      }
    },
  );
  
  export default axiosInstance;