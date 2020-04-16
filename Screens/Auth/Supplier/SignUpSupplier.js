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
import Header from '../../../Component/Header';
const SignUpSupplier = ({navigation}) => {
  const [check, SetCheck] = React.useState(false);
  const [name, SetName] = React.useState('');
  const changeInputHandler = () => {
    SetCheck(!check);
  };
  return (
    <View style={{height:'100%',width:'100%'}}>
    <Header  onPress={() => navigation.goBack()}>{'Sign Up'}</Header>
    <Ui
      TextValue={"Let's Create your Supplier account"}
      ButtonText={'Next'}
      onPressButton={() => navigation.navigate(RouteName.TRUCKLOGO)}
      TextViewStyle={styles.TextViewStyle}>
      <View style={styles.InputMainView}>
        <Input
          rounded
          placeholder="Name"
          onChangeText={e => SetName(e)}
          value={name}
          style={styles.Input}
        />
        <Input rounded placeholder="Email Address" style={styles.Input} />
        <Input rounded placeholder="Cell Phone" style={styles.Input} />
        <Input rounded placeholder="Password" style={styles.Input} />
        <Input rounded placeholder="Re-enter Password" style={styles.Input} />
      </View>

      <View style={styles.radioView}>
        <Checkbox
          checked={check}
          onPress={changeInputHandler}
          TextVal={
            'By signing up, I agree to'
          }
        />
      </View>
    </Ui>
    </View>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  TextViewStyle: {
   // width: responsiveWidth(60),
  },
  Input: {
    marginTop: responsiveHeight(3),
  },
  radioView: {
    marginTop: responsiveHeight(3),
    flexDirection: 'row'
  },
});
export default SignUpSupplier;
