import React from 'react';
import {View, StyleSheet} from 'react-native';
import Input from '../../Component/Input';
import Text from '../../Component/Text';
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
const SignUp = ({navigation}) => {
  const [name, SetName] = React.useState(null);
  const [nameError, SetNameError] = React.useState(false);
  const [nameErrorText, SetNameErrorText] = React.useState(null);
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
  const [languge, setLanguage] = React.useState('English');
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
    if (name === null) {
      SetNameError(true);
      SetNameErrorText('Please Enter Your Name');
    }
    if (email === null) {
      setEmailError(true);
      setEmailErrorText('Please Enter Your Email');
    }
    if (phone === null) {
      setPhoneError(true);
      setPhoneErrorText('Please Enter Your Phone Number');
    }
    if (password === null) {
      setPasswordError(true);
      setPasswordErrorText('Please Enter Your Password');
    }
    if (confirmPassword === null) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText('Please Enter Your Confirm Password');
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText(
        'Password Does not matches with Confirm Password',
      );
    } else if (
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
    ) {
      setisLoading(true);
      const data = {
    data:{
        email: email,
        password: password,
        profileName: name,
        phoneNumber: phone,
        userType: 'Customer',
        Language: languge
    }
      };
      axios
        .post(url + '/api/users/signup', data)
        .then(async Response => {
          console.log('Response', Response.data.code);
          let Code = Response.data.code;
          if (Code === 'ABT0000') {
            setisLoading(false);
            console.log('Customer Added');
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
    <View style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Sign Up'}</Header>

      <Ui
        isLoading={isLoading}
        onPressButton={AddCustomer}
        TextValue={"Let's Create your Customer account"}
        ButtonText={'Get Started'}
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
            rounded
            placeholder="Email Address"
            onChangeText={val => changeEmail(val)}
            value={email}
            style={styles.Input}
          />
          {emailError ? <ErrorView>{emailErrorText}</ErrorView> : null}
          <Input
            rounded
            placeholder="Cell Phone"
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
            placeholder="Password"
            onChangeText={val => changePassword(val)}
            value={password}
            style={styles.Input}
          />
          {passwordError ? <ErrorView>{passwordErrorText}</ErrorView> : null}
          <Input
            rounded
            placeholder="Re-enter Password"
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

        <View style={styles.radioView}>
          <Radio
            selected={languge === 'English' ? true : false}
            onPress={() => setLanguage('English')}
          />
          <Text value={'English'} style={{marginLeft: responsiveWidth(2)}} />

          <Radio
            selected={languge === 'Spanish' ? true : false}
            style={{marginLeft: responsiveWidth(8)}}
            onPress={() => setLanguage('Spanish')}
          />
          <Text value={'Spanish'} style={{marginLeft: responsiveWidth(2)}} />
        </View>
      </Ui>
    </View>
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
  TextSpace: {
    // paddingLeft:responsiveWidth(18)
  },
});
export default SignUp;
