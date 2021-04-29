import React from 'react';
import {View, StyleSheet, SafeAreaView, Linking, Text} from 'react-native';
import Input from '../../Component/Input';
// import Text from '../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Radio from '../../Component/Radio';
import Ui from '../../Component/Ui';
import Header from '../../Component/Header';
import url from './Constants/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import ErrorView from '../../Component/ErrorField';
import * as Route from '../../Constants/RouteName';
import {Language} from '../../Constants/LanguageChangeFunc';
import Checkbox from './../../Component/Checkbox';
import Texts from '../../Component/Text';
const SignUp = ({navigation}) => {
  const [name, SetName] = React.useState(null);
  const [nameError, SetNameError] = React.useState(false);
  const [nameErrorText, SetNameErrorText] = React.useState(null);
  const [check, SetCheck] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorText, setEmailErrorText] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorText, setPhoneErrorText] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorText, setPasswordErrorText] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);
  const [
    confirmPasswordErrorText,
    setConfirmPasswordErrorText,
  ] = React.useState(null);
  const [confirmPasswordErrors, setConfirmPasswordErrors] = React.useState(
    null,
  );
  const [languge, setLanguage] = React.useState('English');
  const [errorTerm, setErrorTerm] = React.useState(false);
  const changeEmail = val => {
    let EmailRegix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (EmailRegix.test(val)) {
      setEmail(val);
      setEmailError(false);
      setEmailErrorText(null);
    } else if (val === '') {
      setEmail(val);
      setEmailError(false);
      setEmailErrorText(null);
    } else if (!EmailRegix.test(val)) {
      setEmail(val);
      setEmailError(true);
      setEmailErrorText('Please Enter Valid Email');
    }
    setEmail(val);
    setEmailError(false);
    setEmailErrorText(null);
  };
  const changePassword = val => {
    let PasswordRegix = /^(?=.*\d).{8,100}$/;
    if (PasswordRegix.test(val)) {
      setPassword(val);
      setPasswordError(false);
      setPasswordErrorText(null);
    } else if (val === '') {
      setPassword(val);
      setPasswordError(false);
      setPasswordErrorText(null);
    } else if (!PasswordRegix.test(val)) {
      setPassword(val);
      setPasswordError(true);
      setPasswordErrorText(
        'Password must be atleast 8 digits long and include atleast one numeric digit',
      );
    }
  };
  const AddCustomer = () => {
    // console.log(languge)
    if (name === null) {
      SetNameError(true);
      SetNameErrorText(Language['Please enter your Name']);
    }
    if (email === null) {
      setEmailError(true);
      setEmailErrorText(Language['Please enter your Email']);
    }
    if (phone === null) {
      setPhoneError(true);
      setPhoneErrorText(Language['Please enter your Phone Number']);
    }
    if (password === null) {
      setPasswordError(true);
      setPasswordErrorText(Language['Please enter your Password']);
    }
    if (confirmPassword === null) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText(
        Language['Please enter your Confirm Password'],
      );
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText(
        'Password Does not matches with Confirm Password',
      );
    }
    // if (!check) {
    //   setErrorTerm(true);
    // }
    else if (
      name &&
      !nameError &&
      email &&
      !emailError &&
      phone &&
      !phoneError &&
      password &&
      !passwordError &&
      confirmPassword &&
      !confirmPasswordError
      // check
    ) {
      setisLoading(true);
      // console.log(languge)
      // const data = {
      //   email: email,
      //   password: password,
      //   profileName: name,
      //   phoneNumber: phone,
      //   userType: 'Customer',
      //   Language: languge,
      // };
      axios
        .post(url + '/api/users/signup', {
          email: email,
          password: password,
          profileName: name,
          phoneNumber: phone,
          userType: 'Customer',
          Language: 'English',
        })
        .then(async Response => {
          console.log('Responsessss', Response.data.code);
          let Code = Response.data.code;
          if (Code === 'ABT0000') {
            setisLoading(false);
            console.log('Customer Added');
            navigation.navigate(Route.SIGNIN);
          } else if (Code === 'Email Address already exist') {
            setConfirmPasswordErrors(true);
            setisLoading(false);
          } else {
            console.log('NOT ADDEED');
            setisLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Sign Up'}</Header>

      <Ui
        buttonStyle={{marginTop: responsiveHeight(2)}}
        ContentStyle={{height: undefined}}
        isLoading={isLoading}
        onPressButton={AddCustomer}
        TextValue={Language['Let’s Create your Customer Account']}
        ButtonText={Language['Get Started']}
        TextSpace={styles.TextSpace}
        TextViewStyle={styles.TextViewStyle}>
        <View style={styles.InputMainView}>
          <Input
            rounded
            placeholder="Name"
            onChangeText={val => {
              SetName(val);
              SetNameError(false);
              SetNameErrorText(null);
            }}
            value={name}
            style={styles.Input}
          />
          {nameError ? <ErrorView>{nameErrorText}</ErrorView> : null}
          <Input
            // lower
            rounded
            placeholder={Language['Email Address']}
            onChangeText={val => changeEmail(val.trim())}
            onBlur={() => setEmail(e => e.toLowerCase())}
            value={email}
            style={styles.Input}
          />
          {emailError ? <ErrorView>{emailErrorText}</ErrorView> : null}
          <Input
            rounded
            placeholder={Language['Cell Phone']}
            keyboardType ={'number-pad'}
            onChangeText={val => {
              setPhone(val);
              setPhoneError(false);
              setPhoneErrorText(null);
            }}
            value={phone}
            style={styles.Input}
          />
          {phoneError ? <ErrorView>{phoneErrorText}</ErrorView> : null}
          <Input
            rounded
            secured
            placeholder="Password"
            onChangeText={val => changePassword(val)}
            value={password}
            style={styles.Input}
          />
          {passwordError ? <ErrorView>{passwordErrorText}</ErrorView> : null}
          <Input
            rounded
            secured
            placeholder={Language['Re-enter Password']}
            onChangeText={val => {
              setConfirmPassword(val);
              setConfirmPasswordError(false);
              setConfirmPasswordErrorText(null);
            }}
            value={confirmPassword}
            style={styles.Input}
          />
          {confirmPasswordError ? (
            <ErrorView>{confirmPasswordErrorText}</ErrorView>
          ) : null}
        </View>

        {/* <View style={styles.radioView}>
          <Radio
            selected={languge === 'English' ? true : false}
            onPress={() => {setLanguage('English');}}
          />
          <Text value={'English'} style={{marginLeft: responsiveWidth(2)}} />

          <Radio
            selected={languge === 'Spanish' ? true : false}
            style={{marginLeft: responsiveWidth(8)}}
            onPress={() => {setLanguage('Spanish')}}
          />
          <Text value={'Spanish'} style={{marginLeft: responsiveWidth(2)}} />
        </View> */}
        {confirmPasswordErrors ? (
          <ErrorView>{'Email Address already exist'}</ErrorView>
        ) : null}

        <View style={styles.radioView1}>
          <Text style={styles.TextStyle}>
            {'By signing up, I agree to'}
            <Text
              onPress={() =>
                Linking.openURL(
                  'http://www.trackyourfoodtruck.com/privacy%20policy.html',
                )
              }
              style={styles.TextStyle1}>
              {' TYFT Terms & Conditions'}
            </Text>
            {' and '}
            <Text
              onPress={() =>
                Linking.openURL(
                  'http://www.trackyourfoodtruck.com/privacy%20policy.html',
                )
              }
              style={styles.TextStyle3}>
              {' privacy policy'}
            </Text>
          </Text>
        </View>

        {errorTerm ? (
          <ErrorView>{'Please accept the term and policy.'}</ErrorView>
        ) : null}
      </Ui>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  TextViewStyle: {
    // width: responsiveWidth(60)
  },
  Input: {
    marginTop: responsiveHeight(2),
    color: '#000',
  },
  radioView: {
    alignSelf: 'center',
    height: responsiveHeight(5),
    flexDirection: 'row',
  },
  radioView1: {
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
  },
  TextSpace: {
    // paddingLeft:responsiveWidth(18)
  },
  TextStyle: {
    marginTop: responsiveHeight(-0.6),
    marginLeft: responsiveWidth(6),
    fontWeight: '500',
    fontSize: responsiveFontSize(1.7),
  },
  TextStyle1: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.7),
    marginLeft: responsiveWidth(1),
    marginTop: responsiveHeight(-0.6),
    color: 'rgb(193, 32, 38)',
  },
  TextStyle2: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.7),
    marginLeft: responsiveWidth(-62),
    marginTop: responsiveHeight(-0.6),
    color: 'rgb(193, 32, 38)',
  },
  TextStyle3: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.7),
    marginLeft: responsiveWidth(1),
    marginTop: responsiveHeight(1.9),
    color: 'rgb(193, 32, 38)',
  },
  TextStyle4: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.7),
    marginLeft: responsiveWidth(1),
    marginTop: responsiveHeight(1.9),
  },
});
export default SignUp;
