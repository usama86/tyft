import React from 'react';
import HomeScreen from './../Screens/Auth/Home';
import SignUpSelection from './../Screens/Auth/SignUpSelection';
import SignIn from './../Screens/Auth/SignIn';
import SignUp from './../Screens/Auth/SignUpCustomer';
import SignUpSupplier from './../Screens/Auth/Supplier/SignUpSupplier';
import TruckLogo from './../Screens/Auth/Supplier/TruckLogo';
import TruckInfo from './../Screens/Auth/Supplier/TruckInfo';
import BusinessHour from './../Screens/Auth/Supplier/BusinessHour';
import SearchTruck from './../Screens/Auth/SearchTruck/SearchTruck';
import FindFoodTruck from './../Screens/Auth/FindFoodTruck';
import * as RouteName from './../Constants/RouteName';
import {createStackNavigator} from '@react-navigation/stack';
const StackAuth = createStackNavigator();
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
    <StackAuth.Screen name={RouteName.TRUCKLOGO} component={TruckLogo} />
    <StackAuth.Screen name={RouteName.TRUCKINFO} component={TruckInfo} />
    <StackAuth.Screen name={RouteName.BUSINESSHOUR} component={BusinessHour} />
    <StackAuth.Screen name={RouteName.SEARCHTRUCK} component={SearchTruck} />
    <StackAuth.Screen name={RouteName.FINDFOODTRUCK} component={FindFoodTruck}/>

  </StackAuth.Navigator>
);
export default AuthStack;
