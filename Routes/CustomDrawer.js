import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
export default function CustomDrawer() {
  useEffect(() => {
    console.log('hi');
  }, []);
  return (
    <View>
      <Text> textInComponent </Text>
    </View>
  );
}
