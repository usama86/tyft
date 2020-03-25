import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { Input, Text, Overlay } from 'react-native-elements';
import theme from './../theme';
import RoundButton from '../../Component/Button';
//import Divider from './../components/core/Divider';
// import * as Screens from './../constants/screens';
// import * as userActions from './../redux/actions/userActions';
// import { connect } from 'react-redux';

const SignIn = props => {
  // const { navigation, user, dispatch, signInUserError } = props;
  const [signInUserError,setsignInUserError]=[{name:'Wrong'}]
  const [email, setEmail] = React.useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState(null);

  const [password, setPassword] = React.useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const handleSignIn = () => {
    if (email == null || email === '') {
      setEmailErrorMessage('Enter a valid email address');
      return;
    } else if (password == null || password === '') {
      setPasswordErrorMessage('Enter a correct password');
      return;
    }
    setLoading(true);
    // dispatch(userActions.signInUser(email, password));
  };
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.contentContainerStyle}>
        <Text style={styles.signInHeader}>{'Sign in'}</Text>
        {/* <Divider /> */}
        <Input
          value={email}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          placeholder="Email"
          inputStyle={styles.inputStyle}
          onChangeText={text => {
            setEmail(text);
            setEmailErrorMessage(null);
          }}
          keyboardType={'email-address'}
          returnKeyType={'next'}
          errorMessage={emailErrorMessage}
        />
        {/* <Divider /> */}
        <Input
          secureTextEntry={true}
          value={password}
          placeholder="Password"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={styles.inputStyle}
          onChangeText={text => setPassword(text)}
          returnKeyType={'done'}
          errorMessage={passwordErrorMessage}
        />
        {/* <Divider /> */}
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <RoundButton title="Login" onPress={handleSignIn} loading={loading} />
        </View>
        {/* <Divider /> */}
        <Text
          style={styles.forgotPasswordText}
          onPress={() => {
            // navigation.navigate(Screens.FORGOT_PASSWORD)}
          }}>
          Don't remember your password?
        </Text>
        {/* <Divider /> */}
        {signInUserError && (
          <Overlay
            isVisible
            width="auto"
            height="auto"
            onBackdropPress={() => {
              // dispatch(userActions.signInUserError(null));
            }}>
            <Text>{signInUserError.message}</Text>
          </Overlay>
        )}
      </View>
    );
  }
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
    fontWeight: 'bold',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
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
});
// function mapStateToProps(state) {
//   return {
//     user: state.userReducer.user,
//     signInUserError: state.userReducer.signInUserError,
//   };
// }

export default(SignIn);
// connect(mapStateToProps)