import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import LoginScreeen from '../screens/auth/Login';
import Mainstack from './Mainstack';
import useAuth from '../hooks/useAuth';
import AuthContext, {AuthProvider} from '../context/AuthProvider';
import AuthRoutes from './AuthRoutes';

export default function Index() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
           <AuthRoutes /> 
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
