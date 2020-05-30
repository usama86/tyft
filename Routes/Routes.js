import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AuthLoading from './../Screens/AuthLoading/AuthLoading';
import VeggieWisper from '../Screens/Auth/Drawer/VeggieWisper';
import MenuSettingDrawer from '../Screens/Auth/Drawer/MenuSettingDrawer';
import * as RouteName from './../Constants/RouteName';
import AuthStack from './AuthStack';
import CustomDrawer from './CustomDrawer';

import Schedule from './../Screens/Auth/Drawer/Schedule';
import CustomerReview from './../Screens/Auth/Drawer/CustomerReview';
import ItemCategory from './../Screens/Auth/Drawer/ItemCategory';
import Profile from './../Screens/Auth/Drawer/Profile';
import Animated from 'react-native-reanimated';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();
console.disableYellowBox = true;

const Routes = () => { 
  return (
    <NavigationContainer>
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
const AppDrawer = () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0.0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 1],
  });
  const screenStyles = {transform: [{scale}]};
  return (
    <Animated.View
      style={[
        {flex: 1, overflow: 'hidden'},
        screenStyles,
      ]}>
      <Drawer.Navigator
        // sceneContainerStyle={{backgroundColor: 'red'}}
        overlayColor={'rgba(0,0,0,0)'}
        drawerContent={props => {
          setProgress(props.progress);
          return <CustomDrawer navigation={props.navigation} />;
        }}
        drawerStyle={{
          width: (Dimensions.get('window').width * 3) / 4,
          backgroundColor: 'rgba(0,0,0,0)',
        }}
        drawerType={'slide'}>
        <Drawer.Screen name={RouteName.VEGGIEWISPER} component={VeggieWisper} />
        <Drawer.Screen name={RouteName.SCHEDULED} component={Schedule} />
        <Drawer.Screen
          name={RouteName.CUSTOMERREVIEWD}
          component={CustomerReview}
        />
        <Drawer.Screen
          name={RouteName.MENUSETTINGDRAWER}
          component={MenuSettingDrawer}
        />
        <Drawer.Screen
          name={RouteName.ITEMCATEGORYD}
          component={ItemCategory}
        />
        <Drawer.Screen name={RouteName.PROFILED} component={Profile} />
      </Drawer.Navigator>
    </Animated.View>
  );
};

export default Routes;
