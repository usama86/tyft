/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from '../../SplashScreen/SplashScreen';

const AuthLoading = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setBarStyle('dark-content');
      navigation.navigate('Auth');
    }, 1000); // amount of time the splash is shown from the time component is rendered
  }, []);

  return <SplashScreen />;
};

export default AuthLoading;
