import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
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
import SettingIcon from 'react-native-vector-icons/Entypo';
import CountButton from '../../Component/CountButton';
import url from './Constants/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import FuzzySearch from 'fuzzy-search';
const Favorite = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [day, setDay] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isMsg, setIsMsg] = useState(false);
  const [searchVal, setSearchVal] = useState('');
const [uniqueProps,setuniqueProps] =useState([])
  const onChangeSearch = val => {
    setSearchVal(val);
    if (val == '') {
      getFavouriteRestaurants();
      setIsMsg(false);
    } else {
      const searcher = new FuzzySearch(Data, ['truckName'], {
        caseSensitive: false,
      });
      const result = searcher.search(val);
      // console.log(result);
      setData(result);
      if (result.length == 0 || result === undefined) {
        setIsMsg(true);
      } else {
        setIsMsg(false);
      }
    }
  };

  const getFavouriteRestaurants = async () => {
    let UserID = await AsyncStorage.getItem('userID');
    console.log(UserID);
    axios
      .post(url + '/api/supplier/getfavoritetruck', {_id: UserID})
      .then(async Response => {
        let ERROR = Response.data.code;
        let Favourites = Response.data.records;
        if (ERROR !== 'ABT0001') {
          let currentDate = moment();
          let day = currentDate.format('dddd');
          setDay(day);
          setData(Favourites);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch(error => {
        setisLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      getFavouriteRestaurants();
    });
  }, []);
  const getStatus = (item, index) => {
    let day = moment(new Date()).format('dddd');
    let matchedDay = item.schedule.filter(data => day === data.day);
    if (matchedDay.length > 0) {
      let startTime = new Date(
        'Mon 03-Jul-2017, ' + matchedDay[0].opening.toString(),
      ).getHours();

      let endTime = new Date(
        'Mon 03-Jul-2017, ' + matchedDay[0].closing.toString(),
      ).getHours();

      console.log('Start Time', startTime);
      console.log('End Time', endTime);
      // console.log('Matched Day', matchedDay);
      var currentTime = new Date().getHours();
      console.log('Current Time ', currentTime);
      if (startTime <= currentTime && currentTime <= endTime) {
        console.log('Between');
        return 'Open';
      } else {
        console.log('No Between');
        return 'Close';
      }
    } else {
      return 'Close';
    }

    // return currentTime.toString();
  };
  const PrintCard = (item, index) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.MainView}
      onPress={() =>
        navigation.navigate(RouteName.CUSTOMERSUPPLIER, {
          TruckInfo: item,
          openMap: null,
        })
      }>
      <View style={styles.LeftIcon}>
        <Image style={styles.image} source={{uri: item.truckLogo}} />
      </View>
      <View style={styles.RightContent}>
        <Text
          style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}
          value={item.truckName}
        />
        <CountButton
          button={item.selectedServingCusines}
          buttonProp={{width: responsiveWidth(17), height: responsiveHeight(3)}}
          tabProp={{
            marginTop: responsiveHeight(-18),
            left: responsiveWidth(-2),
          }}
        />
        <View style={[styles.flex, {marginTop: responsiveHeight(5)}]}>
          <Entypo
            name={'location-pin'}
            color={'#212121'}
            size={responsiveFontSize(2.3)}
          />
          <Text value={item.truckCity} />
        </View>
        {item.schedule
          ? item.schedule.map(item2 =>
              item2.day === day ? (
                <View style={styles.flex}>
                  <AntDesign
                    style={{marginLeft: responsiveWidth(1)}}
                    name={'clockcircleo'}
                    color={'#212121'}
                    size={responsiveFontSize(1.8)}
                  />
                  <Text
                    style={{marginLeft: responsiveWidth(1)}}
                    value={item2.opening}
                  />

                  <Text
                    style={{marginLeft: responsiveWidth(1)}}
                    value={item2.closing}
                  />
                </View>
              ) : null,
            )
          : null}
        <View
          style={[
            styles.flex,
            {justifyContent: 'space-between', height: responsiveHeight(5)},
          ]}>
          <TouchableOpacity>
            <Text
              value={getStatus(item, index)}
              style={{
                color: 'green',
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
              }}
            />
          </TouchableOpacity>

          {item.rating ? (
            <Rating
              startingValue={item.rating}
              imageSize={responsiveFontSize(2.8)}
            />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
  const onFilterSearch = async (selectedItems, Trucks) => {
    // getAllTrucks();
    console.log('hheloooo', selectedItems);
    console.log('Trucks', Trucks);
    let unique = [...new Set(selectedItems)];
    console.log('UNIQUE', unique);
    if (unique.length === 0) {
      getFavouriteRestaurants();
      setIsMsg(false);
      setuniqueProps(unique);
    } else {
      // console.log('\n\n\n\nDATA=>>>\n\n\n', Data);
      let matched = [];
      setuniqueProps(unique);
      for (let i = 0; i < unique.length; i++) {
        for (let j = 0; j < Trucks.length; j++) {
          for (let k = 0; k < Trucks[j].selectedServingCusines.length; k++) {
            // console.log('SELECTED', Data[j].selectedServingCusines[k]);
            if (Trucks[j].selectedServingCusines[k].cusineName === unique[i]) {
              matched.push(Trucks[j]);
            }
          }
        }
      }
      console.log('MATCHED', matched.length);
      if (matched.length == 0 || matched === undefined) {
        console.log('NOT MATCHED');
        setIsMsg(true);
      } else {
        setIsMsg(false);
        await setData(matched);
      }
    }
  };
  const onClear = ()=>{
    getFavouriteRestaurants();
    setIsMsg(false);
  }
  return (
    <SafeAreaView style={styles.parent}>
      <Header Clear onClearPress={onClear} onPress={() => navigation.goBack()}>{'Favourite'}</Header>
      <View style={styles.seacrhbarContainter}>
        <SearchBar
          placeholder="Type something..."
          onChangeText={onChangeSearch}
          value={searchVal}
          round
          lightTheme
          leftIconContainerStyle={{
            borderRadius: 20,
            height: 30,
            left: -12,
          }}
          inputContainerStyle={{
            backgroundColor: '#F5F5F5',
            width: '95%',
            paddingLeft: 5,
            borderWidth: 0,
          }}
          searchIcon={
            <TouchableOpacity>
              <Icon
                name="search"
                size={30}
                color="grey"
                style={{marginLeft: 0}}
              />
            </TouchableOpacity>
          }
          containerStyle={{
            backgroundColor: 'white',
            width: '80%',
            alignSelf: 'center',
            borderWidth: 0,
          }}
        />
        <TouchableOpacity
          style={{}}
          onPress={() =>
            navigation.navigate(RouteName.SERVINGCUSINETYPE2, {
              onFilterSearch: onFilterSearch,
              uniqueProps:uniqueProps
            })
          }>
          <SettingIcon name={'sound-mix'} size={40} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: responsiveHeight(1),
          marginLeft: responsiveWidth(-7),
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {/* <View style={{width: '80%'}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Button style={styles.button}>
              <Text style={styles.TextStyle} value={'Burger'} />
            </Button>
            <Button style={styles.button}>
              <Text style={styles.TextStyle} value={'Pizza'} />
            </Button>
            <Button style={styles.button}>
              <Text style={styles.TextStyle} value={'BBQ'} />
            </Button>
            <Button style={styles.button}>
              <Text style={styles.TextStyle} value={'Burger'} />
            </Button>
            <Button style={styles.button}>
              <Text style={styles.TextStyle} value={'Pizza'} />
            </Button>
            <Button style={styles.button}>
              <Text style={styles.TextStyle} value={'BBQ'} />
            </Button>
          </ScrollView>
        </View> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate(RouteName.SERVINGCUSINETYPE)}>
           <SettingIcon
            name={'sound-mix'}
            size={40}
          />
        </TouchableOpacity> */}
      </View>
      {isLoading ? (
        <ActivityIndicator
          color={'#000'}
          size={'large'}
          style={styles.ActivityView}
        />
      ) : isMsg ? (
        <Text
          value={'No Truck Found'}
          bold
          style={{
            marginTop: responsiveHeight(25),
            marginLeft: responsiveWidth(25),
          }}
        />
      ) : Data.length > 0 ? (
        <FlatList
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => PrintCard(item, index)}
        />
      ) : (
        <Text
          value={'No Truck Found'}
          bold
          style={{
            marginTop: responsiveHeight(25),
            marginLeft: responsiveWidth(25),
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexView: {
    width: '100%',
    height: responsiveHeight(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: responsiveWidth(23),
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    marginLeft: responsiveWidth(5),
  },
  TextStyle: {
    color: 'white',
  },
  TextStyle: {
    color: 'white',
  },
  seacrhbarContainter: {
    backgroundColor: 'white',
    height: responsiveHeight(8),
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  MainView: {
    width: '96%',
    alignSelf: 'flex-end',
    paddingVertical: responsiveHeight(0.5),
    borderBottomWidth: 0.7,
    borderBottomColor: '#212121',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(2),
    alignItems: 'center',
  },
  LeftIcon: {
    width: responsiveHeight(12),
    height: responsiveHeight(12),
    borderRadius: responsiveHeight(12),
  },
  RightContent: {
    width: '70%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveHeight(100),
    // resizeMode: 'contain',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Favorite;
