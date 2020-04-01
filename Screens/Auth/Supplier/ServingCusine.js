import React from 'react';
import {View, StyleSheet} from 'react-native';
import Input from '../../../Component/Input';
import Text from '../../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Checkbox from '../../../Component/Checkbox';
import Ui from '../../../Component/Ui';
import * as RouteName from './../../../Constants/RouteName';
const ServingCusine = ({navigation}) => {
  const [check, SetCheck] = React.useState(false);
  const [name, SetName] = React.useState('');
  const changeInputHandler = () => {
    SetCheck(!check);
  };
  return (
    <Ui
      TextViewStyle={styles.TextViewStyle}
      TextValue={"Serving Cusine"}
      ButtonText={'Next'}
      onPressButton={() => {navigation.navigate(RouteName.MENUSETTING)}}>
      <View style={styles.InputMainView}>
            {/* SHOW THREE BUTTONS IN SCROLL VIEW  */}
      </View>
    </Ui>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  TextViewStyle: {
    //  width: responsiveWidth(60),
    borderBottomWidth:1,
    borderBottomColor:'grey',
  },
 
});
export default ServingCusine;
