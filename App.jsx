import React from 'react';
import Index from './routes/Index';
import Reactotron from 'reactotron-react-native';
import {enableScreens} from 'react-native-screens';
import {ToastProvider} from 'react-native-toast-notifications';
import Nudge from './AtomicComponents/Nudge';

export default function App() {
  if (__DEV__) {
    // At this point, Reactotron is hooked up.
    import('./reactron').then(() => {
      Reactotron.clear();
    });
  }
  enableScreens();
  return (
    <ToastProvider
      offsetBottom={40}
      renderToast={toastOption => <Nudge toastOption={toastOption} />}>
      <Index />
    </ToastProvider>
  );
}
