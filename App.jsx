import React, { useEffect } from 'react';
import Index from './routes/Index';
import Reactotron from 'reactotron-react-native';
import {enableScreens} from 'react-native-screens';
import {store} from './redux/store';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import Nudge from './AtomicComponents/Nudge';
import { PersistGate } from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const persistor = persistStore(store);

  useEffect(()=>{
    SplashScreen.hide()
  },[])
  if (__DEV__) {
    // At this point, Reactotron is hooked up.
    import('./reactron').then(() => {
      Reactotron.clear();
    });
  }
  enableScreens();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider
          offsetBottom={40}
          renderToast={toastOption => <Nudge toastOption={toastOption} />}>
          <Index />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}
