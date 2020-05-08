/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from '../../SplashScreen/SplashScreen';
import AsyncStorage from '@react-native-community/async-storage';
const AuthLoading = ({navigation}) => {
  useEffect(async () => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
    let userID = await AsyncStorage.getItem('userID');
    let userType = await AsyncStorage.getItem('userType');
    console.log('USER TYPE',userType)
    await console.log('Got Token', userID);
    if (userType === 'Supplier') {
      console.log('in supplier')
      setTimeout(() => {
        navigation.navigate('App');
      }, 2000);
    } else if (userType === 'Customer') {
      console.log('in Customer')
      setTimeout(() => {
        navigation.navigate('Auth', {screen: 'Tabs'});
      }, 2000);
    } else if (userType === null) {
      console.log('No Token')
      setTimeout(() => {
        navigation.navigate('Auth');
      }, 2000);
    }
  }, []);
  return <SplashScreen navigation={navigation} />;
};

export default AuthLoading;
