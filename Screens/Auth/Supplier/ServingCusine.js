import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import Text from '../../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Ui from '../../../Component/Ui';
import theme from './../../theme';

import * as RouteName from './../../../Constants/RouteName';
const ServingCusine = ({navigation}) => {

  const [Data, setData] = React.useState([
    {id: 0, name: 'Burgers', checked: false},
    {id: 1, name: 'Pizza', checked: false},
    {id: 2, name: 'Mexican', checked: false},
    {id: 3, name: 'Fries', checked: false},
    {id: 0, name: 'Burgers', checked: false},
    {id: 1, name: 'Pizza', checked: false},
    {id: 2, name: 'Mexican', checked: false},
    {id: 3, name: 'Fries', checked: false},
    {id: 0, name: 'Burgers', checked: false},
    {id: 1, name: 'Pizza', checked: false},
    {id: 2, name: 'Mexican', checked: false},
    {id: 3, name: 'Fries', checked: false},
    {id: 0, name: 'Burgers', checked: false},
    {id: 1, name: 'Pizza', checked: false},
    {id: 2, name: 'Mexican', checked: false},
    {id: 3, name: 'Fries', checked: false},
    {id: 0, name: 'Burgers', checked: false},
    {id: 1, name: 'Pizza', checked: false},
    {id: 2, name: 'Mexican', checked: false},
    {id: 3, name: 'Fries', checked: false},
    {id: 0, name: 'Burgers', checked: false},
    {id: 1, name: 'Pizza', checked: false},
    {id: 2, name: 'Mexican', checked: false},
    {id: 3, name: 'Fries', checked: false},
    {id: 0, name: 'Burgers', checked: false},
    {id: 1, name: 'Pizza', checked: false},
    {id: 2, name: 'Mexican', checked: false},
    {id: 3, name: 'Fries', checked: false},
    {id: 0, name: 'Burgers', checked: false},
    {id: 1, name: 'Pizza', checked: false},
    {id: 2, name: 'Mexican', checked: false},
    {id: 3, name: 'Fries', checked: false},
    {id: 0, name: 'Burgers', checked: false},
    {id: 1, name: 'Pizza', checked: false},
    {id: 2, name: 'Mexican', checked: false},
    {id: 3, name: 'Fries', checked: false},
  ]);
  const Checked = (index) => {
    let newArr = [...Data];
    newArr[index].checked = !newArr[index].checked;
    setData(newArr);
  };
  const PrintCard = (item, index) => (
    <TouchableOpacity
      onPress={() => Checked(index)}
      activeOpacity={0.8}
      style={[
        styles.MainView,
        item.checked
          ? {backgroundColor: theme.colors.primary, borderWidth: 0}
          : null,
      ]}>
      <Text
        style={[item.checked ? {color: 'white'} : null]}
        value={item.name}
      />
    </TouchableOpacity>
  );


  return (
    <Ui
    ContentStyle={styles.HeadingContainer}
      TextViewStyle={styles.TextViewStyle}
      TextValue={"Serving Cusine"}
      ButtonText={'Next'}
      onPressButton={() => {navigation.navigate(RouteName.MENUSETTING)}}>
      <FlatList
        data={Data}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: responsiveHeight(2),
        }}
        renderItem={({item, index}) => PrintCard(item, index)}
      />
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
  HeadingContainer: {
    height: responsiveHeight(67),
    marginLeft:responsiveWidth(-10),
    marginBottom:responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainView: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(25),
    height: responsiveHeight(6),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderColor: '#212121',
    borderWidth: 1,
    marginLeft: '6.25%',
    backgroundColor: '#fff',
  },
 
});
export default ServingCusine;







