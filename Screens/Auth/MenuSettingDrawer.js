import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Input from '../../Component/Input';
import Text from '../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Header from '../../Component/Header'
const MenuSettingDrawer = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#fff'}}>
      <Header onPress={()=>navigation.goBack()} >
          {''}
      </Header>
      <View style={[styles.TextView]}>
        <Text bold value={'MENU SETTING'}  />
      </View>
      <View style={styles.InputMainView}>
        <Input rounded placeholder="Email Address" style={styles.Input} />
        <Input rounded placeholder="Cell Phone" style={styles.Input} />
        <Input rounded placeholder="Password" style={styles.Input} />
        <Input rounded placeholder="Re-enter Password" style={styles.Input} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
    alignSelf:'center',
  },

  Input: {
    marginTop: responsiveHeight(3),
  },
  TextView: {
    width: '80%',
    alignSelf:'center',
  },
});
export default MenuSettingDrawer;
