import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Input, Text, Overlay} from 'react-native-elements';
import theme from './../theme';
import RoundButton from '../../Component/Button';
import Divider from './../../Component/Divider';
import Texts from './../../Component/Text';
import url, { bold } from './Constants/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import ErrorView from '../../Component/ErrorField';
import {CommonActions} from '@react-navigation/native';
import * as RouteName from '../../Constants/RouteName';
import decode from 'jwt-decode';

const SignIn = ({navigation}) => {

  const [email, setEmail] = React.useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  
  return (
    <View style={styles.contentContainerStyle}>
      <Text style={styles.signInHeader}>{'Forgot password'}</Text>
      <Divider />
      <Input
        value={email}
        inputContainerStyle={{
          borderBottomWidth: 0,
        }}
        placeholder="Email"
        inputStyle={[styles.inputStyle]}
        onChangeText={text => {
          setEmail(text);
          setEmailErrorMessage(null);
        }}
        keyboardType={'email-address'}
        returnKeyType={'next'}
        errorMessage={emailErrorMessage}
      />
      <Divider />
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        {loading ? (
          <View style={styles.buttonStyle2}>
            <ActivityIndicator color={'#fff'} size={'large'} />
          </View>
        ) : (
          <RoundButton style={styles.buttonStyle2} >
            <Texts uppercase={false} style={styles.TextStyle1} value={'Next'} />
          </RoundButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 20,
    backgroundColor: 'white',
  },

  appName: {
    height: 100,
    width: 100,
    justifyContent: 'center',
  },
  signInHeader: {
    fontSize: 23,
    ...Platform.select({
      android: {
        fontFamily: bold,
      },
    }),
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 20,
  },
  signInHelpText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  inputStyle: {
    height: 30,
    fontSize: 12,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E8E6E6',
  },
  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: responsiveHeight(6),
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'rgb(0, 0, 0)'
  },
  TextStyle1: {
    color: 'white',
  },
  forgotPasswordText: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 50,
    fontSize: 12,
    textAlign: 'center',
  },
  createAccountText: {
    textAlign: 'center',
    color: theme.colors.secondary,
  },
  CrossView: {
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '95%',
    alignSelf: 'center',
  },
});
// function mapStateToProps(state) {
//   return {
//     user: state.userReducer.user,
//     signInUserError: state.userReducer.signInUserError,
//   };
// }

export default SignIn;
// connect(mapStateToProps)
