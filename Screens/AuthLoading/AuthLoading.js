import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from '../../SplashScreen/SplashScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
const AuthLoading = ({navigation}) => {
  const Setting = async () => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
    let userType = await AsyncStorage.getItem('userType');
    if (userType === 'Supplier') {
        navigation.replace('App');
    } else if (userType === 'Customer') {
        navigation.replace('Auth', {screen: 'Tabs'});
    } else if (userType === null) {
        navigation.replace('Auth');
    }
  };
  useEffect(() => {
    Setting();
  }, []);
  return <SplashScreen navigation={navigation} />;
};

export default AuthLoading;
