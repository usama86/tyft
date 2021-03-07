import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import Animation from './../Component/Animation';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
const SplashScreen = ({navigation}) => {
  const  [val,setVal] = React.useState('');
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
  React.useEffect(()=>{
    setTimeout(async() => {
      setVal('zoomOutDown')
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
    }, 3000);
  },[])
  return (
    <Animation container={styles.container} duration ={2000} navigation={navigation}>
      <Image
        style={styles.logoStyle}
        source={require('./../images/MainLogo.png')}
      />
    </Animation>
  );
};
const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
    // flex: 1,
    // justifyContent: 'center',
     alignItems:'center',

    // backgroundColor:'white'
  },
  logoStyle: {
    height: responsiveHeight(80),
    width: responsiveWidth(60),
    resizeMode: 'contain',

  },
  TextStyle: {
    color: 'rgb(0, 0, 0)',
    marginHorizontal: responsiveWidth(10),
    width: responsiveWidth(20),
  },
});
export default SplashScreen;
