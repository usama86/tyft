import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import Animation from './../Component/Animation';
const SplashScreen = ({navigation}) => {
  const  [val,setVal] = React.useState('');
  React.useEffect(()=>{
    setTimeout(() => {
      setVal('zoomOutDown')
    }, 4000);
  },[])
  return (
    <Animation container={styles.container} navigation={navigation} animationsIn={'zoomInDown'}  animationOut={val}>
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
