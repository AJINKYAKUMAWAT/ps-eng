import {useContext, useDebugValue} from 'react';
import AuthContext from '../context/AuthProvider';
import { Text } from 'react-native';

const useAuth = () => {
  const {auth, isLoggedIn} = useContext(AuthContext);
  useDebugValue(auth, auth => (auth ? <Text>Logged In</Text> : <Text>Not Logged In</Text>));
  return useContext(AuthContext);
};

export default useAuth;

