import React from 'react';
import {View, StyleSheet, Dimensions, Animated, Image} from 'react-native';
// import SplashIcon from './Icons/SplashIcon';
import {StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');
import LaunchScreen from '../../assets/image/splash_screen.png'
const SplashScreen = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Image 
             source={LaunchScreen} 
             resizeMode="contain"
           />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#213578', // Set a background color
  },
  SplashScreen: {
    width: width * 1.0, // 80% of the screen width
    height: height * 1.25, // 40% of the screen height
  },
});

export default SplashScreen;
