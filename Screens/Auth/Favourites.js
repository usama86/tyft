import React, {useEffect} from 'react';
import {StatusBar, View, SafeAreaView, StyleSheet, Text} from 'react-native';

const Favourite = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:25}} >{'Favourites'}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
});
export default Favourite;
