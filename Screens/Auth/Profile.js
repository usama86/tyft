import React from 'react';
import {View, StyleSheet} from 'react-native';
import Input from '../../Component/Input';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ui from '../../Component/Ui';
import * as RouteName from './../../Constants/RouteName';
const Profile = ({navigation}) => {
  const [check, SetCheck] = React.useState(false);
  const [name, SetName] = React.useState('');
  return (
    <Ui
      TextViewStyle={styles.TextViewStyle}
      TextValue={"Your food truck's info"}
      ButtonText={'Next'}
      onPressButton={() => navigation.navigate(RouteName.BUSINESSHOUR)}>
      <View style={styles.InputMainView}>
        <Input
          rounded
          placeholder="Truck Name"
          onChangeText={e => SetName(e)}
          value={name}
          style={styles.Input}
        />
        <Input
          rounded
          placeholder="Business Description"
          style={styles.Input}
        />
        <Input rounded placeholder="Contact" style={styles.Input} />
        <Input rounded placeholder="Email" style={styles.Input} />
        <Input rounded placeholder="City" style={styles.Input} />
        <Input rounded placeholder="Website" style={styles.Input} />
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
  },
  radioView: {
    flexDirection: 'row',
  },
});
export default Profile;
