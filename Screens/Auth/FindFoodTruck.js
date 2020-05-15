import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
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
const FindFoodTruck = ({navigation}) => {
  const [Data, setData] = useState([
    {
      id: 0,
      Title: 'Taco Truck',
      subtitle1: 'American,Soul Food,Indian',
      subtitle2: '1620 US-70,Coleny KS 679311',
      subtitle3: '11:00 AM - 2:00 PM',
      status: 'OPEN',
      rating: 3.5,
    },
    {
      id: 1,
      Title: 'Taco Truck',
      subtitle1: 'American,Soul Food,Indian',
      subtitle2: '1620 US-70,Coleny KS 679311',
      subtitle3: '11:00 AM - 2:00 PM',
      status: 'OPEN',
      rating: 5,
    },
    {
      id: 2,
      Title: 'Taco Truck',
      subtitle1: 'American,Soul Food,Indian',
      subtitle2: '1620 US-70,Coleny KS 679311',
      subtitle3: '11:00 AM - 2:00 PM',
      status: 'OPEN',
      rating: 4,
    },
    {
      id: 3,
      Title: 'Taco Truck',
      subtitle1: 'American,Soul Food,Indian',
      subtitle2: '1620 US-70,Coleny KS 679311',
      subtitle3: '11:00 AM - 2:00 PM',
      status: 'OPEN',
      rating: 2,
    },
    {
      id: 4,
      Title: 'Taco Truck',
      subtitle1: 'American,Soul Food,Indian',
      subtitle2: '1620 US-70,Coleny KS 679311',
      subtitle3: '11:00 AM - 2:00 PM',
      status: 'OPEN',
      rating: 1,
    },
  ]);
const getAllTrucks = ()=>{
  axios
  .get(url + '/api/supplier/getalltruck')
  .then(async Response => {
    let ERROR= Response.data.code;
    let Trucks = Response.data.TruckInfo;
    if(ERROR!=='ABT0001'){
      setData(Trucks)
      console.log('trucks',Response.data.TruckInfo)
    }
 
  })
  .catch(error => {
    console.log(error);
  });
}
  useEffect(()=>{
  getAllTrucks();
  },[])
  const PrintCard = (item, index) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.MainView}
      onPress={() => navigation.navigate(RouteName.CUSTOMERSUPPLIER)}>
      <View style={styles.LeftIcon}>
        <Image style={styles.image} source={require('../../images/art.jpg')} />
      </View>
      <View style={styles.RightContent}>
        <Text
          style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}
          value={item.truckName}
        />
        <CountButton 
        buttonProp={{width:responsiveWidth(17),height:responsiveHeight(3)}}
        tabProp={{marginTop:responsiveHeight(-18),left:responsiveWidth(-2)}}
        />
     
        <View style={[styles.flex,{marginTop:responsiveHeight(5)}]}>
          <Entypo
            name={'location-pin'}
            color={'#212121'}
            size={responsiveFontSize(2.3)}
          />
          <Text value={item.truckCity} />
        </View>
        <View style={styles.flex}>
          <AntDesign
            style={{marginLeft: responsiveWidth(1)}}
            name={'clockcircleo'}
            color={'#212121'}
            size={responsiveFontSize(1.8)}
          />
          <Text
            style={{marginLeft: responsiveWidth(1)}}
            value={item.subtitle3}
          />
        </View>
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
              startingValue={item.rating}
              imageSize={responsiveFontSize(2.8)}
            />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.parent}>
      <Header onPress={() => navigation.goBack()}>{'Find Food Truck'}</Header>
      <View style={styles.seacrhbarContainter}>
        <SearchBar
          placeholder="Type something..."
          //   onChangeText={this.updateSearch}
          // value={search}
          round
          lightTheme
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
          marginLeft:responsiveWidth(-7),
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={{width: '80%'}}>
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
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteName.SERVINGCUSINETYPE)}>
           <SettingIcon
            name={'sound-mix'}
            size={40}
            //style={{marginTop:responsiveHeight(1.3),transform: [{ scaleY: 2 }]}}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.flexView}>
        <Button style={styles.button}>
          <Text style={styles.TextStyle} value={'Burger'} />
        </Button>
        <Button style={styles.button}>
          <Text style={styles.TextStyle} value={'Pizza'} />
        </Button>
        <Button style={styles.button}>
          <Text style={styles.TextStyle} value={'BBQ'} />
        </Button>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteName.SERVINGCUSINETYPE)}>
          <Image
            style={{width: responsiveWidth(8), height: responsiveHeight(4)}}
            source={require('../../images/filter.png')}
          />
        </TouchableOpacity>
      </View> */}
      <FlatList
        data={Data}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => PrintCard(item, index)}
      />
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

export default FindFoodTruck;
