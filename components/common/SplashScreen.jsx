import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {StatusBar} from 'react-native';

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
    backgroundColor:'#4894FE'
  },
  SplashScreen: {
    width: '100%', // Full width
    height: '100%', // Full height
  },
});

export default SplashScreen;
