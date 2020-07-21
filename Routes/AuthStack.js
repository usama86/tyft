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
import * as theme from '../Screens/theme';
import Favourite from '../Screens/Auth/Favourites';
import CustomerSupplier from './../Screens/Auth/CustomerSupplier';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Account from './../Screens/Auth/Account';
import AccountInfo from './../Screens/Auth/AccountInfo';
import ServingCusineType2 from '../Screens/Auth/ServingCusineType2';
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
    <StackSearch.Screen
      name={RouteName.SERVINGCUSINETYPE}
      component={ServingCusinetype}
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
      name={RouteName.CUSTOMERSUPPLIER}
      component={CustomerSupplier}
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
const FavouriteStack = () => (
  <StackFavourite.Navigator screenOptions={{headerShown: false}}>
    <StackFavourite.Screen name={'Favourite'} component={Favourite} />
    <StackSearch.Screen
      name={RouteName.CUSTOMERSUPPLIER}
      component={CustomerSupplier}
    />
    

    <StackSearch.Screen
      name={RouteName.SERVINGCUSINETYPE}
      component={ServingCusinetype}
    />
        <StackSearch.Screen
      name={RouteName.SERVINGCUSINETYPE2}
      component={ServingCusineType2}
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
  </StackFavourite.Navigator>
);
const AccountStack = () => (
  <StackFavourite.Navigator screenOptions={{headerShown: false}}>
    <StackFavourite.Screen name={'AccountInfo'} component={AccountInfo} />
    <StackFavourite.Screen name={'Account'} component={Account} />
  </StackFavourite.Navigator>
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
        } else if (route.name === 'FavouriteStack') {
          iconName = 'heart';
          return <FA name={iconName} color={color} size={size} />;
        } else if (route.name === 'AccountStack') {
          iconName = 'user-circle';
          return <FA name={iconName} color={color} size={size} />;
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: theme.default.colors.primary,
      inactiveTintColor: 'gray',
    }}>
    <Tabs.Screen
      options={{title: 'Near Me'}}
      name={'NearMe'}
      children={NearMeStack}
    />
    <Tabs.Screen name={'Search'} children={SearchStack} />
    <Tabs.Screen
      options={{title: 'Favourite'}}
      name={'FavouriteStack'}
      children={FavouriteStack}
    />
    <Tabs.Screen
      options={{title: 'Account'}}
      name={'AccountStack'}
      children={AccountStack}
    />
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
      options={{headerShown: false}}
    />
    <StackAuth.Screen
      name={RouteName.SIGNUPSELECTION}
      component={SignUpSelection}
      options={{headerShown: false}}
    />
    <StackAuth.Screen name={RouteName.SIGNIN} component={SignIn} />
    <StackAuth.Screen
      name={RouteName.SIGNUP}
      component={SignUp}
      options={{headerShown: false}}
    />
    <StackAuth.Screen
      name={RouteName.SIGNUPSUPPLIER}
      component={SignUpSupplier}
      options={{headerShown: false}}
    />
    <StackAuth.Screen
      name={RouteName.TRUCKLOGO}
      component={TruckLogo}
      options={{headerShown: false}}
    />
    <StackAuth.Screen
      name={RouteName.TRUCKINFO}
      component={TruckInfo}
      options={{headerShown: false}}
    />
    <StackAuth.Screen
      name={RouteName.BUSINESSHOUR}
      component={BusinessHour}
      options={{headerShown: false}}
    />
    <StackAuth.Screen
      name={RouteName.SERVINGCUSINE}
      component={ServingCusine}
      options={{headerShown: false}}
    />
    <StackAuth.Screen
      name={RouteName.SOCIALMEDIADETAILS}
      component={SocialMedia}
      options={{headerShown: false}}
    />
    <StackAuth.Screen
      name={RouteName.MENUSETTING}
      component={MenuSetting}
      options={{headerShown: false}}
    />
    <StackAuth.Screen
      name={RouteName.COVERPHOTO}
      component={CoverPhoto}
      options={{headerShown: false}}
    />
    <StackAuth.Screen
      options={{headerShown: false}}
      name={RouteName.TABS}
      children={AppTab}
    />
  </StackAuth.Navigator>
);
export default AuthStack;
