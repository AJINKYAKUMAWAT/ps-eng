import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import persistStore from 'redux-persist/es/persistStore';
import {store} from '../redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Mainstack from './Mainstack';
import LoginScreeen from '../screens/auth/Login';

export default function Index() {
  const persistor  = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <LoginScreeen/>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

