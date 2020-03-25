/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './SplashScreen/SplashScreen';
import Route from './Routes/Routes';

const App=()=> {
  
  const [hideSplash, setHideSplash] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplash(true);
    }, 3000); // amount of time the splash is shown from the time component is rendered
  }, []);
  


  return (
    <NavigationContainer>
      {hideSplash ?<Route/>:<SplashScreen/>}
      
     </NavigationContainer>
  );
};



export default App;
