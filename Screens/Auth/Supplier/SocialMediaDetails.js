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
const MenuSetting = ({navigation}) => {
  const [check, SetCheck] = React.useState(false);
  const [name, SetName] = React.useState('');
  const changeInputHandler = () => {
    SetCheck(!check);
  };
  return (
    <Ui
      TextViewStyle={styles.TextViewStyle}
      TextValue={"Social Media Details"}
      ButtonText={'Next'}
      onPressButton={() => {navigation.navigate(RouteName.SERVINGCUSINE)}}>
      <View style={styles.InputMainView}>

        <View style={styles.Time}>        
            <Input rounded placeholder="Facebook" style={styles.Input} />
            <Input rounded placeholder="Instagram" style={styles.Input} />
            <Input rounded placeholder="Twitter" style={styles.Input} />
        </View>



      </View>
    </Ui>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  Input: {
    marginTop: responsiveHeight(3),
  },
  TextViewStyle: {
  //  width: responsiveWidth(60),
  borderBottomWidth:1,
  borderBottomColor:'grey',
  },
  TextView: {
    width: '90%',
    marginLeft:responsiveWidth(3),
    borderBottomWidth:1,
    borderBottomColor:'grey',
  },
  radioView: {
    flexDirection: 'row',
  },
  Time:{
      height:responsiveHeight(20)
  }
});
export default MenuSetting;
