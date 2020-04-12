import React from 'react';
import Text from './../Component/Text';
import {TouchableOpacity} from 'react-native';
import HomeScreen from './../Screens/Auth/Home';
import SignUpSelection from './../Screens/Auth/SignUpSelection';
import SignIn from './../Screens/Auth/SignIn';
import SignUp from './../Screens/Auth/SignUpCustomer';
import SignUpSupplier from './../Screens/Auth/Supplier/SignUpSupplier';
import TruckLogo from './../Screens/Auth/Supplier/TruckLogo';
import TruckInfo from './../Screens/Auth/Supplier/TruckInfo';
import BusinessHour from './../Screens/Auth/Supplier/BusinessHour';
import ServingCusine from '../Screens/Auth/Supplier/ServingCusine';
import SearchTruck from './../Screens/Auth/SearchTruck/SearchTruck';
import FindFoodTruck from './../Screens/Auth/FindFoodTruck';
import * as RouteName from './../Constants/RouteName';
import {createStackNavigator} from '@react-navigation/stack';
import MenuSetting from '../Screens/Auth/Supplier/MenuSetting';
import CoverPhoto from './../Screens/Auth/Supplier/CoverPhoto';
import SocialMedia from './../Screens/Auth/Supplier/SocialMediaDetails';
import ServingCusinetype from './../Screens/Auth/ServingCusineType';
import Profile from './../Screens/Auth/Profile';
import Menu from './../Screens/Auth/Menu';
import CustomerReviews from './../Screens/Auth/CustomerReviews';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FA from 'react-native-vector-icons/FontAwesome';
import * as theme from '../Screens/theme' 
const Tabs = createBottomTabNavigator();
const StackAuth = createStackNavigator();
const StackNearMe = createStackNavigator();
const StackSearch = createStackNavigator();
const StackFavourite = createStackNavigator();

const NearMeStack = () => (
  <StackNearMe.Navigator screenOptions={{headerShown: false}}>
    <StackNearMe.Screen
      name={RouteName.SEARCHTRUCK}
      options={{title: 'Search Truck'}}
      component={SearchTruck}
    />
  </StackNearMe.Navigator>
);
const SearchStack = () => (
  <StackSearch.Navigator screenOptions={{headerShown: false}}>
    <StackSearch.Screen
      name={RouteName.FINDFOODTRUCK}
      component={FindFoodTruck}
    />
    <StackSearch.Screen
      name={RouteName.SERVINGCUSINETYPE}
      component={ServingCusinetype}
    />
    <StackSearch.Screen
      options={{headerShown: false}}
      name={RouteName.PROFILE}
      component={Profile}
    />
    <StackSearch.Screen name={RouteName.MENU} component={Menu} />
    <StackSearch.Screen
      name={RouteName.CUSTOMERREVIEWS}
      component={CustomerReviews}
    />
  </StackSearch.Navigator>
);
const AppTab = () => (
  <Tabs.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'NearMe') {
          iconName = 'map-marker';
          return <FA name={iconName} color={color} size={size} />;
        } else if (route.name === 'Search') {
          iconName = 'search';
          return <FA name={iconName} color={color} size={size} />;
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: theme.default.colors.primary,
      inactiveTintColor: 'gray',
    }}>
    <Tabs.Screen name={'NearMe'} children={NearMeStack} />
    <Tabs.Screen name={'Search'} children={SearchStack} />
  </Tabs.Navigator>
);
const AuthStack = () => (
  <StackAuth.Navigator
    headerBackTitle="Back"
    headerTitle="Back"
    initialRouteName={RouteName.HOME}>
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
    <StackAuth.Screen
      name={RouteName.SERVINGCUSINE}
      component={ServingCusine}
    />
    <StackAuth.Screen
      name={RouteName.SOCIALMEDIADETAILS}
      component={SocialMedia}
    />
    <StackAuth.Screen name={RouteName.MENUSETTING} component={MenuSetting} />
    <StackAuth.Screen name={RouteName.COVERPHOTO} component={CoverPhoto} />
    <StackAuth.Screen
      options={{headerShown: false}}
      name={RouteName.TABS}
      children={AppTab}
    />
  </StackAuth.Navigator>
);
export default AuthStack;
