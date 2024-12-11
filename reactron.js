import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';

let reactotron = null;
if (__DEV__) {
  reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      name: 'My app',
      // host: '192.168.0.108',
    }) // controls connection & communication settings
    .use(reduxPlugin())
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate/,
      },
    }) // add all built-in react native plugins
    .connect(); // let's connect!
}

export default reactotron;
