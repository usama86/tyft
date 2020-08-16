import React from 'react';
import {View, StyleSheet} from 'react-native';
import Input from '../../../Component/Input';
import Text from '../../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Checkbox from '../../../Component/Checkbox';
import Ui from '../../../Component/Ui';
import * as RouteName from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import ErrorView from '../../../Component/ErrorField';
import axios from 'axios';
const SignUpSupplier = ({navigation}) => {
  const [isLoading, setisLoading] = React.useState(false);
  const [check, SetCheck] = React.useState(false);
  const [name, SetName] = React.useState({
    name: null,
    nameError: null,
    nameErrorText: null,
  });
  const [email, setEmail] = React.useState({
    email: null,
    emailError: null,
    emailErrorText: null,
  });
  const [phone, setPhone] = React.useState({
    phone: null,
    phoneError: null,
    phoneErrorText: null,
  });
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
  const [confirmPasswordErrors,setConfirmPasswordErrors] = React.useState(null);
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
  const changePassword = e => {
    console.log(e);
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
      console.log(password.pass);
    }
  };
  const Navigate = () => {
    if (!name.name) {
      SetName({
        name: null,
        nameError: true,
        nameErrorText: 'Name must not be empty',
      });
    }
    if (!email.email) {
      setEmail({
        email: null,
        emailError: true,
        emailErrorText: 'Email must not be empty',
      });
    }
    if (!phone.phone) {
      setPhone({
        phone: null,
        phoneError: true,
        phoneErrorText: 'Phone must not be empty',
      });
    }
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
    if (password.password !== confirmpass.confirmpass) {
      console.log('in not equal')
      setConfirmPass({
        confirmpass: null,
        confirmPassError: true,
        confirmPassErrorText:
          'Confirm Password does not matches with password',
      });
    }
    if (!check) {
      setConfirmPass({
        confirmpass: null,
        confirmPassError: true,
        confirmPassErrorText:
          'Your should agree to terms and conditions to Join!',
      });
    } else if (
      name.name &&
      email.email &&
      !email.emailError &&
      phone.phone &&
      password.password &&
      !password.passwordError &&
       confirmpass.confirmpass &&
      !confirmpass.confirmPassError&&
      check
    ) {
      axios
      .post(url + '/api/users/getuser', {
        email: email.email,
      })
      .then(async Response => {
        if(Response.data.length<1)
        {
          console.log('com',confirmpass.confirmPassError)
          navigation.navigate(RouteName.TRUCKLOGO, {
            Name: name.name,
            Email: email.email,
            Phone: phone.phone,
            Password: password.password,
          });
        }
        else
          setConfirmPasswordErrors(true);

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
        TextValue={"Let's Create your Supplier account"}
        ButtonText={'Next'}
        onPressButton={Navigate}
        TextViewStyle={styles.TextViewStyle}>
        <View style={styles.InputMainView}>
          <Input
            rounded
            placeholder="Name"
            onChangeText={e =>
              SetName({name: e, nameError: false, nameErrorText: null})
            }
            value={name.name}
            style={styles.Input}
          />
          {name.nameError ? <ErrorView>{name.nameErrorText}</ErrorView> : null}
          <Input
            rounded
            value={email.email}
            //  
            onChangeText={e => changeEmail(e)}
            placeholder="Email Address"
            style={styles.Input}
          />
          {email.emailError ? (
            <ErrorView>{email.emailErrorText}</ErrorView>
          ) : null}
          <Input
            rounded
            value={phone.phone}
            onChangeText={e =>
              setPhone({phone: e, phoneError: false, phoneErrorText: null})
            }
            keyboardType={'number-pad'}
            placeholder="Cell Phone"
            style={styles.Input}
          />
          {phone.phoneError ? (
            <ErrorView>{phone.phoneErrorText}</ErrorView>
          ) : null}
          <Input
            secured
            rounded
            placeholder="Password"
            value={password.password}
            onChangeText={e => changePassword(e)}
            style={styles.Input}
          />
          {password.passwordError ? (
            <ErrorView>{password.passwordErrorText}</ErrorView>
          ) : null}
          <Input
            secured
            rounded
            placeholder="Re-enter Password"
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
        </View>

        <View style={styles.radioView}>
          <Checkbox
            checked={check}
            onPress={() => SetCheck(!check)}
            TextVal={'By signing up, I agree to'}
          />
        </View>
        {confirmPasswordErrors ? (
            <ErrorView>{'Email Address already exist'}</ErrorView>
          ) : null}
      </Ui>
    </View>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  TextViewStyle: {
    // width: responsiveWidth(60),
  },
  Input: {
    marginTop: responsiveHeight(3),
  },
  radioView: {
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
  },
});
export default SignUpSupplier;
