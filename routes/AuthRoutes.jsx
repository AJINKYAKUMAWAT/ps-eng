import React, {useContext, useEffect} from 'react';
import LoginScreeen from '../screens/auth/Login';
import Mainstack from './Mainstack';
import AuthContext from '../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthRoutes() {
  const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext);
  // useEffect(() => {
  //   console.log("Hello")
  //   AsyncStorage.clear(); 
  //     setIsLoggedIn(false);

  // }, []);

  return <>{isLoggedIn ? <Mainstack /> : <LoginScreeen />}</>;
}
