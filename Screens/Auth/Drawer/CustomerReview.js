import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';

import Text from '../../../Component/Text';
import {SearchBar, Rating} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import url from '../Constants/constants';
import moment from 'moment';
//import * as RouteName from '../../Constants/RouteName';
import Header from '../../../Component/Header';
const CustomerReview = ({navigation}) => {
  const [menuItem, setMenuItem] = useState('Mexican');
  const [Data, setData] = useState([]);
  useEffect(() => {
    getCustomerReviews();
  }, []);
  const getCustomerReviews = async () => {
    let UserID = await AsyncStorage.getItem('userID');
    let truckID = await AsyncStorage.getItem('TruckID');
    console.log(UserID);
    axios
      .post(url + '/api/supplier/getcustomerreview', {_id: truckID})
      .then(async Response => {
        let ERROR = Response.data.code;
        let Reviews = Response.data.Review;
        console.log('Reviews', Reviews);
        if (ERROR !== 'ABT0001') {
          setData(Reviews);
        } else {
          setData(null);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const CalculateTime = date => {
    let years = moment(new Date()).diff(moment(date), 'years');
    if (years === 0) {
      let months = moment(new Date()).diff(moment(date), 'months');
      if (months === 0) {
        let days = moment(new Date()).diff(moment(date), 'days');
        if (days === 0) {
          let hours = moment(new Date()).diff(moment(date), 'hours');
          if (hours === 0) {
            let minutes = moment(new Date()).diff(moment(date), 'minutes');
            if (minutes === 0) {
              return 'now';
            } else {
              return minutes + 'm';
            }
          } else {
            return hours + 'h';
          }
        } else {
          return days + 'd';
        }
      } else {
        return months + 'm';
      }
    } else {
      return years + 'y';
    }
  };
  const PrintCard = (item, index) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.MainView}>
      <View style={styles.TopView}>
        <Rating
          startingValue={item.Rating}
          imageSize={responsiveFontSize(2.8)}
        />
        <Text style={{color: '#A6A6A6'}} value={item.Name} />
        <Text style={{color: '#A6A6A6'}} value={CalculateTime(item.date)} />
      </View>
      <View style={styles.BottomView}>
        <Text value={item.Review} />
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.parent}>
      <View>
        <Header isHome onPress={() => navigation.openDrawer()}>
          {'Customer Review'}
        </Header>
      </View>
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

export default CustomerReview;
