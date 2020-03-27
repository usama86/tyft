import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './../Screens/Auth/Home';
import SignUpSelection from './../Screens/Auth/SignUpSelection';
import SignIn from './../Screens/Auth/SignIn';
import SignUp from './../Screens/Auth/SignUp';
import * as RouteName from './../Constants/RouteName';

const Stack = createStackNavigator();
const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={RouteName.HOME}
        component={HomeScreen}
        options={{title: 'Overview'}}
      />
      <Stack.Screen
        name={RouteName.SIGNUPSELECTION}
        component={SignUpSelection}
      />
      <Stack.Screen name={RouteName.SIGNIN} component={SignIn} />
      <Stack.Screen name={RouteName.SIGNUP} component={SignUp} />
    </Stack.Navigator>
  );
};

export default Routes;
