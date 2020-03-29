import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './../Screens/Auth/Home';
import SignUpSelection from './../Screens/Auth/SignUpSelection';
import SignIn from './../Screens/Auth/SignIn';
import SignUp from '../Screens/Auth/SignUpCustomer';
import SignUpSupplier from './../Screens/Auth/SignUpSupplier';
import AuthLoading from './../Screens/AuthLoading/AuthLoading';
import * as RouteName from './../Constants/RouteName';
console.disableYellowBox = true;

const AppStack = createStackNavigator();
const StackAuth = createStackNavigator();
const Routes = () => {
  const AuthStack = () => (
    <StackAuth.Navigator initialRouteName={RouteName.HOME}>
      <StackAuth.Screen
        name={RouteName.HOME}
        component={HomeScreen}
        options={{title: 'Overview', headerShown: false}}
      />
      <StackAuth.Screen
        name={RouteName.SIGNUPSELECTION}
        component={SignUpSelection}
      />
      <StackAuth.Screen name={RouteName.SIGNIN} component={SignIn} />
      <StackAuth.Screen name={RouteName.SIGNUP} component={SignUp} />
      <StackAuth.Screen
        name={RouteName.SIGNUPSUPPLIER}
        component={SignUpSupplier}
      />
    </StackAuth.Navigator>
  );

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="AuthLoading">
        <AppStack.Screen name={'AuthLoading'} component={AuthLoading} />
        <AppStack.Screen name={'Auth'} children={AuthStack} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
