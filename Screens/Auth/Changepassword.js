import React from 'react';
import {View, StyleSheet, Alert, ActivityIndicator,SafeAreaView} from 'react-native';
import Input from '../../Component/Input';
import Text from '../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Checkbox from '../../Component/Checkbox';
import Ui from '../../Component/Ui';
import * as RouteName from './../../Constants/RouteName';
import Header from '../../Component/Header';
import ErrorView from '../../Component/ErrorField';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import url from './Constants/constants';

const changePassword = ({navigation}) => {
  const [isLoading, setisLoading] = React.useState(false);
  const [check, SetCheck] = React.useState(false);
  const [password, setPassword] = React.useState({
    password: null,
    passwordError: null,
    passwordErrorText: null,
  });
  const [confirmpass, setConfirmPass] = React.useState({
    confirmpass: null,
    confirmPassError: null,
    confirmPassErrorText: null,
  });
  const [finalPass, setFinalPass] = React.useState({
    value: null,
    Error: null,
  });
  const [confirmPasswordErrors, setConfirmPasswordErrors] = React.useState(
    null,
  );
  const [tempPass, setTempPass] = React.useState('');
  const [indicator, setIndicator] = React.useState(false);
  const [indicator1, setIndicator1] = React.useState(false);

  React.useEffect(() => {
    // setIndicator(true);
    // getUserDetails();
  }, []);
  const changeEmail = e => {
    let EmailRegix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (EmailRegix.test(e)) {
      setEmail({email: e, emailError: null, emailErrorText: null});
    } else if (e === '') {
      setEmail({email: e, emailError: null, emailErrorText: null});
    } else if (!EmailRegix.test(e)) {
      setEmail({
        email: e,
        emailError: true,
        emailErrorText: 'Please Enter valid Email',
      });
    }
  };
  const getUserDetails = async () => {
    let userId = await AsyncStorage.getItem('userID');
    axios
      .post(url + '/api/supplier/getsupplier', {id: userId})
      .then(async Response => {
        if (Response.data.code !== 'ABT0001') {
          let res = Response.data;
          // let newArr = [{...res.Supplier[0], TruckInfo: res.TruckInfo}];
          let userData = res.Supplier[0];
          SetName({
            name: userData.profileName,
            nameError: false,
            nameErrorText: null,
          });
          setEmail({
            email: userData.email,
            emailError: null,
            emailErrorText: null,
          });
          setPhone({
            phone: userData.phoneNumber,
            phoneError: false,
            phoneErrorText: null,
          });
          setTempPass(userData.password);
          setIndicator(false);
        } else {
          setIndicator(false);
        }
      })
      .catch(error => {
        // console.log(error);
        Alert.alert(error.toString());
        setIndicator(false);
      });
  };
  const changePassword = e => {
    let PasswordRegix = /^(?=.*\d).{8,100}$/;
    if (PasswordRegix.test(e)) {
      setPassword({
        password: e,
        passwordError: false,
        passwordErrorText: null,
      });
    } else if (e === '') {
      setPassword({
        password: e,
        passwordError: null,
        passwordErrorText: null,
      });
    } else if (!PasswordRegix.test(e)) {
      setPassword({
        password: e,
        passwordError: true,
        passwordErrorText:
          'Password must be atleast 8 digits long and include atleast one numeric digit',
      });
    }
  };

  const checkPassword = async e => {
    setIndicator1(true);
    let getEmail = await AsyncStorage.getItem('email');
    console.log(getEmail);
    // console.log(e.currentTarget.value)
    axios
      .post(url + '/api/users/checkpassword', {
        email: getEmail,
        password: password.password,
      })
      .then(async Response => {
        if (Response.data.code !== 'ABT0001') {
          let res = Response.data;
          console.log(res);
          if (res && res.message === 'correct') {
            setIndicator1(false);
          } else {
            setPassword({
              password: password.password,
              passwordError: true,
              passwordErrorText: 'Old Password is incorrect',
            });
            setIndicator1(false);
          }
        } else {
          // setIndicator(false);
          setIndicator1(false);
        }
      })
      .catch(error => {
        // console.log(error);
        Alert.alert(error.toString());
        setIndicator1(false);
        // setIndicator(false);
      });
  };
  const updateProfile = async () => {
    if (!password.password) {
      setPassword({
        password: null,
        passwordError: true,
        passwordErrorText: 'Password must not be empty',
      });
    }
    if (!confirmpass.confirmpass) {
      setConfirmPass({
        confirmpass: null,
        confirmPassError: true,
        confirmPassErrorText: 'Confirm password must not be empty',
      });
    }
    if (confirmpass.confirmpass !== finalPass.value) {
      setFinalPass({
        value: finalPass.value,
        Error: 'Confirm password doesn not matches with new password',
      });
    } else if (
      password.password &&
      !password.passwordError &&
      confirmpass.confirmpass &&
      !confirmpass.confirmPassError &&
      !finalPass.Error
    ) {
      let userID = await AsyncStorage.getItem('userID');
      setisLoading(true);
      axios
        .post(url + '/api/users/updateuserpassword', {
          _id: userID,
          // email: email.email,
          password: confirmpass.confirmpass,
          // profileName: name.name,
          // phoneNumber: phone.phone,
        })
        .then(async Response => {
          // await AsyncStorage.setItem('language' + '', Language);
          console.log(Response.data);
          let Code = Response.data.code;

          // console.log(Response)
          if (Code === 'ABT0000') {
            setisLoading(false);
            setPassword({
              password: null,
              passwordError: false,
              passwordErrorText: null,
            });
            setConfirmPass({
              confirmpass: null,
              confirmPassError: false,
              confirmPassErrorText: null,
			});
			setFinalPass({
				value:null,
				Error:null
			})
            // await AsyncStorage.setItem('userName' + '', name.value);
            Alert.alert('Updated');
            // setUpdated(true);
            // setTimeout(() => {
            //   setUpdated(false);
            // }, 500);
            //  navigation.navigate('AccountInfo');
          } else {
            setisLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
          setisLoading(false);
        });
    }
  };
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Profile'}</Header>
      {indicator ? (
        <ActivityIndicator color={'#fff'} size={'large'} />
      ) : (
        <Ui
          isLoading={isLoading}
          TextValue={"Let's Edit your Password"}
          ButtonText={'Update'}
          onPressButton={updateProfile}
          TextViewStyle={styles.TextViewStyle}>
          <View style={styles.InputMainView}>
          <Input
              secured
              rounded
              placeholder="Current Password"
              value={password.password}
              onChangeText={e => changePassword(e)}
              onBlur={e => checkPassword(e)}
              style={styles.Input}
            />
            {password.passwordError ? (
              <ErrorView>{password.passwordErrorText}</ErrorView>
            ) : null}
            <Input
              secured
              rounded
              placeholder="New Password"
              value={confirmpass.confirmpass}
              onChangeText={e =>
                setConfirmPass({
                  confirmpass: e,
                  confirmPassError: false,
                  confirmPassErrorText: null,
                })
              }
              style={styles.Input}
            />
            {confirmpass.confirmPassError ? (
              <ErrorView>{confirmpass.confirmPassErrorText}</ErrorView>
            ) : null}
            <Input
              secured
              rounded
              placeholder="Confirm Password"
              value={finalPass.value}
              onChangeText={e => setFinalPass({value: e, Error: null})}
              style={styles.Input}
            />
            {finalPass.value ?<ErrorView>{finalPass.Error}</ErrorView>:null}
            {indicator1 ? (
              <ActivityIndicator color={'black'} size={'large'} />
            ) : null}
          </View>
          {confirmPasswordErrors ? (
            <ErrorView>{'Email Address already exist'}</ErrorView>
          ) : null}
        </Ui>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(5),
  },
  TextViewStyle: {
    // width: responsiveWidth(60),
  },
  Input: {
    marginTop: responsiveHeight(5),
  },
  radioView: {
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
  },
});
export default changePassword;
