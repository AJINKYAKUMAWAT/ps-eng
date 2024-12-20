import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomStatusBar } from '../components/CustomStatusBar';
import { Image } from 'react-native';
import SplashScreen from '../components/common/SplashScreen';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutTrigger, setLogoutTrigger] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [accountDetail, setAccountDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  // const axiosInstance = useAxiosPrivate();
  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
    };
    fetchToken();
    getUserDetails();
  }, [logoutTrigger]);

  const getUserDetails = async () => {
    const userDetails = JSON.parse(await AsyncStorage.getItem('user'));
    const userToken = await AsyncStorage.getItem('token');
    setAuth(userDetails);
    if (userToken) {
      setIsLoggedIn(true);
      setLoading(false);
    } else {
      setIsLoggedIn(false);
      setLoading(true);
      setTimeout(() => {
        setIsLoggedIn(false);
        setLoading(false);
      }, 3000);
    }
  };

  const getToken = async () => {
    try {
      setLoading(true);
      const tokenKey = 'token';
      const token = await AsyncStorage.getItem(tokenKey);
      console.log('Previous Token Data found in storage:', token);
   
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const clearUserDetails = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false); // Ensure the user is logged out
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isLoggedIn,
        setIsLoggedIn,
        logoutTrigger,
        setLogoutTrigger,
        userDetail,
        setUserDetail,
        accountDetail,
        setAccountDetail,
        clearUserDetails
      }}>
         {loading ? (
        <CustomStatusBar>
      <SplashScreen/>
        </CustomStatusBar>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
 