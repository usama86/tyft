import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
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
import * as RouteName from '../../Constants/RouteName';
import Header from '../../Component/Header';
const CustomerReviews = ({navigation}) => {
  const [menuItem, setMenuItem] = useState('Mexican');
  const [Data, setData] = useState([
    {
      id: 0,
      rating: 3.5,
      Name: 'John Smith',
      time: '2 hour ago',
      review:
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
    {
      id: 1,
      rating: 3,
      Name: 'John Smith',
      time: '2 hour ago',
      review:
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
    {
      id: 2,
      rating: 4,
      Name: 'John Smith',
      time: '2 hour ago',
      review:
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
    {
      id: 3,
      rating: 3,
      Name: 'John Smith',
      time: '2 hour ago',
      review:
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
    {
      id: 4,
      rating: 3,
      Name: 'John Smith',
      time: '2 hour ago',
      review:
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
    {
      id: 5,
      rating: 3,
      Name: 'John Smith',
      time: '2 hour ago',
      review:
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
    {
      id: 6,
      rating: 3,
      Name: 'John Smith',
      time: '2 hour ago',
      review:
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
  ]);
  const PrintCard = (item, index) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.MainView}>
      <View style={styles.TopView}>
        <Rating
          startingValue={item.rating}
          imageSize={responsiveFontSize(2.8)}
        />
        <Text style={{color: '#A6A6A6'}} value={item.Name} />
        <Text style={{color: '#A6A6A6'}} value={item.time} />
      </View>
      <View style={styles.BottomView}>
        <Text value={item.review} />
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.parent}>
      <Header  onPress={() => navigation.goBack()}>{'Customer Reviews'}</Header>
      <FlatList
        data={Data}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingVertical: responsiveHeight(2),
        }}
        renderItem={({item, index}) => PrintCard(item, index)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainView: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: responsiveHeight(2),
    borderBottomColor: '#212121',
    borderBottomWidth: 0.3,
    alignItems: 'center',
  },
  TopView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BottomView: {
    marginTop: responsiveHeight(2),
    width: '100%',
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CustomerReviews;
