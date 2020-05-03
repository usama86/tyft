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
import AsyncStorage from '@react-native-community/async-storage';
const AuthLoading = ({navigation}) => {
  useEffect(async()=>{
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff')
    let token = await AsyncStorage.getItem('token');
    await console.log('Got Token', token);
    if(token){
      setTimeout(() => {
        navigation.navigate('App')
      }, 2000);
    }
    else if(token===null){
      setTimeout(() => {
        navigation.navigate('Auth')
      }, 2000);
    }

  },[])
  return <SplashScreen navigation={navigation} />;
};

export default AuthLoading;
