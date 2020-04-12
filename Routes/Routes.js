import React from 'react';
import {Dimensions} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AuthLoading from './../Screens/AuthLoading/AuthLoading';
import VeggieWisper from './../Screens/Auth/VeggieWisper';
import MenuSettingDrawer from './../Screens/Auth/MenuSettingDrawer';
import * as RouteName from './../Constants/RouteName';
import AuthStack from './AuthStack';
import CustomDrawer from './CustomDrawer';
const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();
console.disableYellowBox = true;
const Routes = () => {
  const AppDrawer = () => (
    <Drawer.Navigator
      drawerContent={()=><CustomDrawer/>}
      drawerStyle={{width: (Dimensions.get('window').width * 3) / 4}}>
      <Drawer.Screen name={RouteName.VEGGIEWISPER} component={VeggieWisper} />
      <Drawer.Screen name={RouteName.MENUSETTINGDRAWER} component={MenuSettingDrawer} />
    </Drawer.Navigator>
  );
  return (
    <NavigationContainer >
      <AppStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="AuthLoading">
        <AppStack.Screen name={'AuthLoading'} component={AuthLoading} />
        <AppStack.Screen name={'Auth'} children={AuthStack} />
        <AppStack.Screen name={'App'} children={AppDrawer} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
