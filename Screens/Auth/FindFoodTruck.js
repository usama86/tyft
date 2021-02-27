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
import moment from 'moment';
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');
import Geolocation from '@react-native-community/geolocation';
import {showLocation} from 'react-native-map-link';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import {Language} from '../../Constants/LanguageChangeFunc';
const FindFoodTruck = ({navigation, route}) => {
  const [Data, setData] = useState([]);
  const [day, setDay] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const [isMsg, setIsMsg] = useState(false);
  const [buttonData, setButtonData] = React.useState([]);
  const [indicator, setIndicator] = React.useState(true);
  const [cusineName, setCusineName] = useState(null);
  const [Lat, setLat] = React.useState(0.0);
  const [Long, setLong] = React.useState(0.0);
  const [uniqueProps, setuniqueProps] = useState([]);
  const onChangeSearch = val => {
    setSearchVal(val);
    if (val == '') {
      getAllTrucks();
      setIsMsg(false);
    } else {
      const searcher = new FuzzySearch(
        Data,
        ['truckName', 'selectedServingCusines.cusineName', 'truckCity'],
        {
          caseSensitive: false,
        },
      );
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
  const onFilterSearch = async (selectedItems, Trucks) => {
    // getAllTrucks();
    console.log('hheloooo', selectedItems);
    console.log('Trucks', Trucks);
    let unique = [...new Set(selectedItems)];
    console.log('UNIQUE', unique);
    if (unique.length === 0) {
      getAllTrucks();
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
        let filtered = matched.filter(
          (v, i, a) => a.findIndex(t => t._id === v._id) === i,
        );
        setIsMsg(false);
        await setData(filtered);
      }
    }
  };
  // const onFilterSearch = async (selectedItems, Trucks) => {
  //   // getAllTrucks();
  //   console.log('hheloooo', selectedItems);
  //   console.log('Trucks', Trucks);
  //   let unique = [...new Set(selectedItems)];
  //   console.log('UNIQUE', unique);
  //   if (unique.length === 0) {
  //     getAllTrucks();
  //     setIsMsg(false);
  //   } else {
  //     // console.log('\n\n\n\nDATA=>>>\n\n\n', Data);
  //     let matched = [];
  //     for (let i = 0; i < unique.length; i++) {
  //       for (let j = 0; j < Trucks.length; j++) {
  //         for (let k = 0; k < Trucks[j].selectedServingCusines.length; k++) {
  //           // console.log('SELECTED', Data[j].selectedServingCusines[k]);
  //           if (Trucks[j].selectedServingCusines[k].cusineName === unique[i]) {
  //             matched.push(Trucks[j]);
  //           }
  //         }
  //       }
  //     }
  //     console.log('MATCHED', matched.length);
  //     if (matched.length == 0 || matched === undefined) {
  //       console.log('NOT MATCHED');
  //       setIsMsg(true);
  //       setTimeout(() => {
  //         setIsMsg(false);
  //         getAllTrucks();
  //       }, 1000);
  //     } else {
  //       setIsMsg(false);
  //       await setData(matched);
  //     }
  //   }
  // };
  const getStatus = (item, index) => {
    let day = moment(new Date()).format('dddd');
    console.log('day', day);
    let matchedDay = item.schedule.filter(data => day === data.day);
    console.log('schedule', matchedDay);
    if (matchedDay.length > 0) {
      let startTime = new Date(
        'Mon 03-Jul-2017, ' + matchedDay[0].opening.toString(),
      ).getHours();

      let endTime = new Date(
        'Mon 03-Jul-2017, ' + matchedDay[0].closing.toString(),
      ).getHours();

      // console.log('Start Time', startTime);
      // console.log('End Time', endTime);
      // console.log('Matched Day', matchedDay);
      var currentTime = new Date().getHours();
      // console.log('Current Time ', currentTime);
      if (
        (startTime <= currentTime && currentTime <= endTime) ||
        item.status === 'Open'
      ) {
        // console.log('Between');
        return 'Open';
      } else {
        // console.log('No Between');
        return 'Close';
      }
    } else {
      return 'Close';
    }

    // return currentTime.toString();
  };
  const getMargin=()=>{
    let x = Language['No Truck Found']; 
    console.log(x.length);
    if(x.length>14)
      return responsiveWidth(25);
    else
      return responsiveWidth(32);  
  }
  const getAllTrucks = () => {
    console.log('in trucks');
    axios
      .get(url + '/api/supplier/getalltruck')
      .then(async Response => {
        let ERROR = Response.data.code;
        let Trucks = Response.data.TruckInfo;
        if (ERROR !== 'ABT0001') {
          let currentDate = moment();
          let filtered = Trucks.filter(item => item.status === 'Open');
          let day = currentDate.format('dddd');
          setDay(day);
          setData(filtered);
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
  // const setDataParams = async () => {
  //   if (route.params.CusineName) {
  //     // setCusineName(data);
  //     let CheckArray = route.params.CusineName? route.params.CusineName.filter(item => item.checked):null;
  //     console.log('Checked Array', CheckArray);
  //     // let oldAray = [...buttonData];
  //     // for (let i = 0; i < oldAray.length; i++) {
  //     //   if (oldAray[i].cusineName === CheckArray[i].cusineName)
  //     //     oldAray[i].checked = true;
  //     // }
  //   }
  //   // await setButtonData(oldAray);
  //   console.log('in Effect', route.params.CusineName);
  // };
  useEffect(() => {
    getCurrentLocation();
    getCusine();
    getAllTrucks();
  }, []);
  const openMap = (sourceLat, sourceLong) => {
    console.log('source lat', sourceLat);
    console.log('sorce long', sourceLong);
    console.log('Lat', Lat);
    console.log('Long', Long);
    showLocation({
      latitude: Lat,
      longitude: Long,
      sourceLatitude: sourceLat, // optionally specify starting location for directions
      sourceLongitude: sourceLong, // not optional if sourceLatitude is specified
      title: 'The White House', // optional
      googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
      googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58', // optionally specify the google-place-id
      alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
      dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
      dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
      cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
      appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
      // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
      // app: 'uber'  // optionally specify specific app to use
    });
  };
  const getCusine = async () => {
    axios
      .get(url + '/api/servingcusine/getcusines')
      .then(async Response => {
        if (Response) {
          // console.log(Response);
          // console.log('Response of getCusine', Response.data);
          if (Response.data.length > 0) {
            let res = await Response.data[0].cusine;
            await setButtonData(res);
            // console.log('Button', res);
          }
          setIndicator(false);
        } else {
          setIndicator(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getCurrentLocation = async () => {
    // console.log('hi in get Current in FindFoodTruck');
    await Geolocation.getCurrentPosition(
      async position => {
        await setLat(position.coords.latitude);
        await setLong(position.coords.longitude);
      },
      error => console.log('this is ERROR', error),
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 2000,
      },
    );
  };
  const getRating = customerReview => {
    console.log('in get rating');
    let RatingVal = 0;
    let len = customerReview.length;
    if (customerReview !== [] && len > 0) {
      for (var i = 0; i < len; i++) {
        RatingVal += customerReview[i].Rating;
      }
      RatingVal = RatingVal / customerReview.length;
      // setRatingVal(RatingVal);
      return RatingVal;
    }
  };
  const PrintCard = (item, index) => {
    console.log('Item is here', item);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.MainView}
        onPress={() => {
          navigation.navigate(RouteName.CUSTOMERSUPPLIER, {
            TruckInfo: item,
            openMap: openMap,
          });
        }}>
        <View style={styles.LeftIcon}>
          <Image style={styles.image} source={{uri: item.truckLogo}} />
        </View>
        <View style={styles.RightContent}>
          <Text
            style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}
            value={item.truckName}
          />
          <CountButton
            navigation={navigation}
            button={item.selectedServingCusines}
            buttonProp={{
              width: '30%',
              marginRight: responsiveWidth(2),
              right: responsiveWidth(1),
              paddingHorizontal: responsiveWidth(2),
            }}
            tabProp={{
              marginTop: responsiveHeight(-17.5),
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          />
          <View style={[styles.flex, {marginTop: responsiveHeight(5)}]}>
            <Entypo
              name={'location-pin'}
              color={'#212121'}
              size={responsiveFontSize(2.3)}
            />
            <Text value={item.truckCity} />
            <TouchableOpacity
              onPress={() => openMap(item.latitude, item.longitude)}
              style={{
                flexDirection: 'row',
                width: '90%',
                height: responsiveHeight(5),
                alignItems: 'center',
                marginLeft: responsiveWidth(3),
              }}>
              <FA5
                name={'directions'}
                color={'green'}
                size={responsiveFontSize(3)}
              />
              <Text
                style={{marginLeft: responsiveWidth(2)}}
                value={Language['Get Directions']}
              />
              {/* <Text
                            style={[
                              {marginLeft: responsiveWidth(1)},
                            ]}>
                            {'Get Directions'}
                          </Text> */}
            </TouchableOpacity>
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

            <Rating
              readonly={true}
              startingValue={getRating(item.customerReview)}
              imageSize={responsiveFontSize(2.8)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onClear = () => {
    getAllTrucks();
    setIsMsg(false);
    setuniqueProps([]);
  };
  return (
    <SafeAreaView style={styles.parent}>
      <Header
        Clear
        onClearPress={onClear}
        NoIcon
        nothing
        onPress={() => navigation.navigate(RouteName.SEARCHTRUCK)}>
        {Language['Search Truck']}
      </Header>
      <View style={styles.seacrhbarContainter}>
        <SearchBar
          placeholder={Language['Type something']}
          round
          value={searchVal}
          lightTheme
          onChangeText={onChangeSearch}
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
        <SettingIcon
          name={'sound-mix'}
          size={38}
          color={'grey'}
          style={{}}
          onPress={() => {
            navigation.navigate(RouteName.SERVINGCUSINETYPE, {
              onFilterSearch: onFilterSearch,
              uniqueProps: uniqueProps,
            });
            // getAllTrucks();
          }}
          //style={{marginTop:responsiveHeight(1.3),transform: [{ scaleY: 2 }]}}
        />
      </View>
      <View
        style={{
          marginVertical: responsiveHeight(1),
          marginLeft: responsiveWidth(-7),
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      />
      {isLoading ? (
        <ActivityIndicator
          color={'#000'}
          size={'large'}
          style={styles.ActivityView}
        />
      ) : isMsg ? (
        <Text
          value={Language['No Truck Found']}
          style={{
            marginTop: responsiveHeight(25),
            marginLeft: getMargin(),
            fontSize:responsiveFontSize(2),
            fontFamily:'NunitoSans-Bold' 
          }}
        />
      ) : Data.length > 0 && Data !== [undefined] ? (
        <View style={{flex: 1}}>
          <FlatList
            data={Data !== [undefined] && Data !== undefined ? Data : []}
            keyExtractor={item => item._id}
            contentContainerStyle={{paddingBottom: responsiveHeight(8)}}
            renderItem={({item, index}) => PrintCard(item, index)}
          />
        </View>
      ) : (
        <Text
          value={Language['No Truck Found']}
          style={{
            marginTop: responsiveHeight(25),
            marginLeft: getMargin(),
            fontSize:responsiveFontSize(2),
            fontFamily:'NunitoSans-Bold' 
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
    backgroundColor: theme.colors.underline,
    borderRadius: 8,
    marginLeft: responsiveWidth(5),
    elevation: 5,
  },
  TextStyle: {
    color: '#000',
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
  ActivityView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default FindFoodTruck;
