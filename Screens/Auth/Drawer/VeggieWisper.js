import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Container from '../../../Component/Container';
import Text from '../../../Component/Text';
import theme from '../../theme';
import {SearchBar, Rating} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import {Switch} from 'react-native-switch';
import Button from '../../../Component/Button';
import CountButton from '../../../Component/CountButton';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as RouteName from '../../../Constants/RouteName';
import Header from '../../../Component/Header';
import AsyncStorage from '@react-native-community/async-storage';
import url from './../Constants/constants';
import axios from 'axios';
const VeggieWisper = ({navigation, route}) => {
  const [ToggleSwitch, setToggleSwitch] = useState(false);
  const [button, setButton] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [userInfo, setUserInfo] = useState([]);
  const [TruckInfo, setTruckInfo] = useState({});
  const [indicator, setIndicator] = useState(true);
  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    let userId = await AsyncStorage.getItem('userID');
    axios
      .post(url + '/api/supplier/getsupplier', {id: userId})
      .then(async Response => {
        if (Response.data.code !== 'ABT0001') {
          let res = Response.data;
          let newArr = [{...res.Supplier[0], TruckInfo: res.TruckInfo}];
          setUserInfo(newArr);
          setTruckInfo(res.TruckInfo[0]);
          setIndicator(false);
          await AsyncStorage.setItem('TruckID'+'',res.TruckInfo[0]._id);
          await AsyncStorage.setItem('MenuID'+'',res.TruckInfo[0].MenuID);
        } else {
          setIndicator(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const updateStatus = async (val, truckID) => {
    let Status = null;
    if (val) {
      Status = 'Open';
    } else if (!val) {
      Status = 'Close';
    }
    axios
      .post(url + '/api/supplier/updatestatus', {_id: truckID, status: Status})
      .then(async Response => {
        if (Response.data.code === 'ABT0000') {
          let newObj = {...TruckInfo};
          newObj.status = Status;
          setTruckInfo(newObj);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  if (indicator) {
    return (
      <ActivityIndicator
        size={'large'}
        color={'#000'}
        style={styles.indicator}
      />
    );
  } else {
    return (
      <Container>
        <View style={styles.HeaderContainer}>
          <ImageBackground
            style={styles.image}
            source={require('../../../images/art.jpg')}>
            <Header isHome onPress={() => navigation.openDrawer()}>
              {'Home'}
            </Header>
          </ImageBackground>
        </View>
        <CountButton button={TruckInfo.selectedServingCusines} /> 

        <View style={styles.flexView}>
          <Text bold style={{color: 'blue'}} value={TruckInfo.truckName} />
        </View>
        <View style={[styles.flexView, {marginTop: 0}]}>
          <Rating
            readonly
            startingValue={TruckInfo.rating}
            imageSize={responsiveFontSize(2.8)}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '30%',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                {
                  color: 'green',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                },
                TruckInfo.status === 'Close' ? {color: 'red'} : null,
              ]}
              value={TruckInfo.status}
            />
            <Switch
              value={TruckInfo.status === 'Close' ? false : true}
              onValueChange={val => updateStatus(val, TruckInfo._id)}
              activeText={'On'}
              inActiveText={'Off'}
              circleSize={30}
              barHeight={responsiveHeight(3.2)}
              circleBorderWidth={0}
              backgroundActive={'green'}
              backgroundInactive={'rgb(200,200,200)'}
              circleActiveColor={'white'}
              circleInActiveColor={'white'}
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            />
          </View>
        </View>
        <View
          style={{
            width: '85%',
            paddingVertical: responsiveHeight(5),
            marginLeft: responsiveWidth(3),
          }}>
          <Text value={TruckInfo.businessDesc} />
        </View>
        <View style={styles.iconView}>
          <AntDesign
            style={{marginLeft: responsiveWidth(1), width: '20%'}}
            name={'mail'}
            color={'#212121'}
            size={responsiveFontSize(2.5)}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(1.8),
              color: '#212121',
            }}
            value={TruckInfo.truckEmail}
          />
        </View>
        <View style={styles.iconView}>
          <Foundation
            style={{marginLeft: responsiveWidth(1), width: '20%'}}
            name={'shield'}
            color={'#212121'}
            size={responsiveFontSize(2.5)}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(1.8),
              color: '#212121',
            }}
            value={TruckInfo.truckWebsite}
          />
        </View>
        <View style={styles.iconView}>
          <AntDesign
            style={{marginLeft: responsiveWidth(1), width: '20%'}}
            name={'phone'}
            color={'#212121'}
            size={responsiveFontSize(2.5)}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(1.8),
              color: '#212121',
            }}
            value={TruckInfo.truckContact}
          />
        </View>
        <View style={styles.SocialIcons}>
          <AntDesign
            name={'twitter'}
            color={'#212121'}
            size={responsiveFontSize(2.5)}
          />
          <AntDesign
            name={'instagram'}
            color={'#212121'}
            size={responsiveFontSize(2.5)}
          />
          <AntDesign
            name={'facebook-square'}
            color={'#212121'}
            size={responsiveFontSize(2.5)}
          />
        </View>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  HeaderContainer: {
    height: responsiveHeight(25),
    width: '100%',
  },
  image: {
    width: '100%',
    height: '102%',
  },
  TabView: {
    height: responsiveHeight(7),
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: responsiveHeight(21),
  },
  Button: {
    width: responsiveWidth(30),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5,
  },
  Btntext: {
    color: 'white',
  },
  flexView: {
    marginTop: responsiveHeight(5),
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconView: {
    marginVertical: responsiveHeight(1),
    width: '80%',
    flexDirection: 'row',
    marginLeft: responsiveWidth(3),
    alignItems: 'center',
  },
  SocialIcons: {
    height: responsiveHeight(15),
    width: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0
  }
});

export default VeggieWisper;
