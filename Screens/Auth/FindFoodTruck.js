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

const FindFoodTruck = ({navigation, route}) => {
  const [Data, setData] = useState([]);
  const [day, setDay] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const [isMsg, setIsMsg] = useState(false);
  const [buttonData, setButtonData] = React.useState([]);
  const [indicator, setIndicator] = React.useState(true);
  const [cusineName, setCusineName] = useState(null);
  const onChangeSearch = val => {
    setSearchVal(val);
    if (val == '') {
      getAllTrucks();
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

  const getAllTrucks = () => {
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
  const setDataParams = async () => {
    let data; //= route.params.CusineName;
    if (route && route.params && route.params.CusineName) {
      // setCusineName(data);
      setButtonData(route.params.CusineName);
      console.log('in Effect',data)
    }
  };
  useEffect(() => {
    getCusine();
    getAllTrucks();
    navigation.addListener('focus', () => {
      setDataParams();
    });
  }, []);
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
  const PrintCard = (item, index) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.MainView}
      onPress={() =>
        navigation.navigate(RouteName.CUSTOMERSUPPLIER, {TruckInfo: item})
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
              value={item.status}
              style={{
                color: 'green',
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
              }}
            />
          </TouchableOpacity>
          {item.rating ? (
            <Rating
              readonly={true}
              startingValue={item.rating}
              imageSize={responsiveFontSize(2.8)}
            />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
  const Checked = index => {
    let newArr = [...buttonData];
    newArr[index].checked = !newArr[index].checked;
    setButtonData(newArr);
  };
  return (
    <SafeAreaView style={styles.parent}>
      <Header onPress={() => navigation.goBack()}>{'Find Food Truck'}</Header>
      <View style={styles.seacrhbarContainter}>
        <SearchBar
          placeholder="Type something..."
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
            width: '100%',
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
            width: '90%',
            alignSelf: 'center',
            borderWidth: 0,
          }}
        />
      </View>
      <View
        style={{
          marginVertical: responsiveHeight(1),
          marginLeft: responsiveWidth(-7),
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={{width: '80%'}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {buttonData
              ? buttonData.map((data, index) => (
                  <Button
                    onPress={() => Checked(index)}
                    style={[
                      styles.button,
                      data.checked
                          ? {
                              backgroundColor: theme.colors.primary,
                              borderWidth: 0,
                            }
                          : null
                      // : route.params.CusineName === data.cusineName
                      // ? {
                      //     backgroundColor: theme.colors.primary,
                      //     borderWidth: 0,
                      //   }
                      // : null,
                    ]}>
                    <Text
                      style={[
                        styles.TextStyle,
                        data.checked 
                            ? {color: '#fff'}
                            : {color: '#000'}
                      ]}
                      value={data.cusineName}
                    />
                  </Button>
                ))
              : null}
          </ScrollView>
        </View>

        <SettingIcon
          name={'sound-mix'}
          size={38}
          color={'grey'}
          onPress={() => {
            navigation.navigate(RouteName.SERVINGCUSINETYPE);
          }}
          //style={{marginTop:responsiveHeight(1.3),transform: [{ scaleY: 2 }]}}
        />
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
