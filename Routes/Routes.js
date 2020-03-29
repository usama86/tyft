import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthLoading from './../Screens/AuthLoading/AuthLoading';
import AuthStack from './AuthStack';

const AppStack = createStackNavigator();
console.disableYellowBox = true;
const Routes = () => {
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
