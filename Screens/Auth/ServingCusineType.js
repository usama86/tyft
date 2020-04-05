import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import Container from '../../Component/Container';
import Button from '../../Component/Button';
import Text from '../../Component/Text';
import theme from '../theme';
import {SearchBar, Rating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const FindFoodTruck = ({navigation}) => {
  const [Data, setData] = useState([
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
    <Container containerStyle={styles.ContainerStyles}>
      <View style={styles.HeadingContainer}>
        <Text
          style={{textTransform: 'uppercase'}}
          bold
          value={'Serving by Cuisine Type'}
        />
      </View>

      <FlatList
        data={Data}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: responsiveHeight(2),
        }}
        renderItem={({item, index}) => PrintCard(item, index)}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  HeadingContainer: {
    height: responsiveHeight(8),
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

export default FindFoodTruck;
