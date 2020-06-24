import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from '../../SplashScreen/SplashScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
const AuthLoading = ({navigation}) => {
  const Setting = async () => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
    let userID = await AsyncStorage.getItem('userID');
    let userType = await AsyncStorage.getItem('userType');
    console.log('USER TYPE', userType);
    await console.log('Got Token', userID);
    if (userType === 'Supplier') {
      console.log('in supplier');
      // setTimeout(() => {
        navigation.replace('App');
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: 'App'}],
        //   }),
        // );
      // }, 2000);
    } else if (userType === 'Customer') {
      // console.log('in Customer');
      // setTimeout(() => {
        navigation.replace('Auth', {screen: 'Tabs'});
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: 'Tabs'}],
        //   }),
        // );
      // }, 2000);
    } else if (userType === null) {
      // console.log('No Token');
      // setTimeout(() => {
        navigation.replace('Auth');
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: 'Auth'}],
        //   }),
        // );
      // }, 2000);
    }
  };
  useEffect(() => {
    Setting();
  }, []);
  return <SplashScreen navigation={navigation} />;
};

export default AuthLoading;
