/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React,{useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from '../../SplashScreen/SplashScreen';

const AuthLoading = ({navigation}) => {
  useEffect(()=>{
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff')
    setTimeout(() => {
      navigation.navigate('Auth')
    }, 2000);
  },[])
  return <SplashScreen navigation={navigation} />;
};

export default AuthLoading;
