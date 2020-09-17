import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ImageBackground,
  Linking,
} from 'react-native';
import Container from './../../Component/Container';
import Text from '../../Component/Text';
import Button from '../../Component/Button';
import theme from './../theme';
import {SearchBar, Rating} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import {Switch} from 'react-native-switch';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as RouteName from '../../Constants/RouteName';
import Header from '../../Component/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import url from './Constants/constants';
import axios from 'axios';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
const CustomerSupplier = ({navigation, route}) => {
  const [ToggleSwitch, setToggleSwitch] = useState(false);
  const [favoriteSwitch, setFavoriteSwitch] = useState(false);
  const [ratingVal, setRatingVal] = useState(0);
  useEffect(() => {
    console.log('Params in=>', route.params.TruckInfo.socialMedia);
    getRating();
    getFavorite();
  }, []);
  const getRating = () => {
    console.log('in get rating');
    let RatingVal = 0;
    let len = route.params.TruckInfo.customerReview.length;
    if (route.params.TruckInfo.customerReview !== [] && len > 0) {
      for (var i = 0; i < len; i++) {
        RatingVal += route.params.TruckInfo.customerReview[i].Rating;
      }
      RatingVal = RatingVal / route.params.TruckInfo.customerReview.length;
      setRatingVal(RatingVal);
    }
  };
  const getFavorite = async () => {
    let userID = await AsyncStorage.getItem('userID');
    axios
      .post(url + '/api/supplier/getfavoritetruck', {
        _id: userID,
      })
      .then(async Response => {
        if (Response.data && Response.data.records) {
          for(let x=0;x<Response.data.records.length;x++)
          {
            if(Response.data.records[x]._id === route.params.TruckInfo._id)
              setFavoriteSwitch(true);
          }  
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const setFavorite = async val => {
    let userID = await AsyncStorage.getItem('userID');
    axios
      .post(url + '/api/supplier/setfavorite', {
        UserID: userID,
        TruckID: route.params.TruckInfo._id,
        selected: val,
      })
      .then(async Response => {
        if (Response.data.code !== 'ABT0001') {
          setFavoriteSwitch(!favoriteSwitch);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Container>
      <View style={styles.HeaderContainer}>
        <ImageBackground
          style={styles.image}
          source={{uri: route.params.TruckInfo.coverPhoto}}>
          <Header NoIcon onPress={() => navigation.goBack()}>
            {route.params.TruckInfo.truckName}
          </Header>
        </ImageBackground>
      </View>
      <View style={styles.TabView}>
        <Button style={styles.Button}>
          <Text style={styles.Btntext} value={'Info'} />
        </Button>
        <Button
          onPress={() => {
            // console.log(route.params.TruckInfo.MenuID);
            navigation.navigate(RouteName.MENU, {
              Menu: route.params.TruckInfo.MenuID,
              TruckID:route.params.TruckInfo._id,
            });
          }}
          style={[styles.Button, {backgroundColor: 'white'}]}>
          <Text style={[styles.Btntext, {color: 'black'}]} value={'Menu'} />
        </Button>
        <Button
          onPress={() =>
            navigation.navigate(RouteName.CUSTOMERREVIEWS, {
              ID: route.params.TruckInfo._id,
            })
          }
          style={[styles.Button, {backgroundColor: 'white'}]}>
          <Text style={[styles.Btntext, {color: 'black'}]} value={'Reviews'} />
        </Button>
      </View>

      <View style={styles.flexView1}>
        <Text
          bold
          style={{color: 'blue'}}
          value={route.params.TruckInfo.truckName}
        />

        {favoriteSwitch ? (
          <Entypo
            style={{
              marginLeft: responsiveWidth(4),
              marginTop: responsiveHeight(0.7),
              color: '#B40E33',
            }}
            name={'heart'}
            // color={'#212121'}sadsd
            size={responsiveFontSize(3)}
            onPress={() => {
              setFavorite(false);
            }}
          />
        ) : (
          <Entypo
            style={{
              marginLeft: responsiveWidth(4),
              marginTop: responsiveHeight(0.7),
              color: '#B40E33',
            }}
            name={'heart-outlined'}
            // color={'#212121'}sadsd
            size={responsiveFontSize(3)}
            onPress={() => {
              setFavorite(true);
            }}
          />
        )}
      </View>
      <View style={[styles.flexView, {marginTop: 0}]}>
        {route.params.TruckInfo.rating ? (
          <Rating
            readonly
            startingValue={route.params.TruckInfo.rating}
            imageSize={responsiveFontSize(2.8)}
          />
        ) : (
          <Rating
            readonly
            startingValue={ratingVal}
            imageSize={responsiveFontSize(2.8)}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginLeft: responsiveWidth(3),
        }}>
        <Text
          style={{
            color: 'green',
            fontWeight: 'bold',
            fontSize: responsiveFontSize(2),
          }}
          value={''}
        />
        <TouchableOpacity
          onPress={() =>
            route.params.openMap(
              route.params.TruckInfo.latitude,
              route.params.TruckInfo.longitude,
            )
          }
          style={{
            flexDirection: 'row',
            width: '40%',
            height: responsiveHeight(5),
            alignItems: 'center',
            marginLeft: responsiveWidth(3),
            alignSelf: 'flex-end',
          }}>
          <FA5
            name={'directions'}
            color={'green'}
            size={responsiveFontSize(3)}
          />
          <Text
            style={{marginLeft: responsiveWidth(2)}}
            value={'Get Directions'}
          />
          {/* <Text
                            style={[
                              {marginLeft: responsiveWidth(1)},
                            ]}>
                            {'Get Directions'}
                          </Text> */}
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '85%',
          paddingVertical: responsiveHeight(5),
          marginLeft: responsiveWidth(3),
        }}>
        <Text value={route.params.TruckInfo.businessDesc} />
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
          value={route.params.TruckInfo.truckEmail}
        />
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL(route.params.TruckInfo.truckWebsite)}
        style={styles.iconView}>
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
          value={route.params.TruckInfo.truckWebsite}
        />
      </TouchableOpacity>
      <View style={styles.iconView}>
        <Feather
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
          value={route.params.TruckInfo.truckContact}
        />
      </View>
      <View style={styles.SocialIcons}>
        {route.params.TruckInfo.socialMedia.twitter ? (
          <TouchableOpacity
          style={{width:responsiveWidth(10),height:responsiveHeight(5)}}
            onPress={() =>
              Linking.openURL(route.params.TruckInfo.socialMedia.twitter)
            }>
            <Image
              style={{width: '100%', height: '100%'}}
              resizeMode={'contain'}
              source={require('../../images/twitter.png')}
            />
          </TouchableOpacity>
        ) : // <AntDesign
        //   onPress={() =>
        //     Linking.openURL(route.params.TruckInfo.socialMedia.twitter)
        //   }
        //   name={'twitter'}
        //   color={'#212121'}
        //   size={responsiveFontSize(2.5)}
        // />
        null}
        {route.params.TruckInfo.socialMedia.instagram ? (
                   <TouchableOpacity
                   style={{width:responsiveWidth(10),height:responsiveHeight(5)}}
                   onPress={() =>
                     Linking.openURL(route.params.TruckInfo.socialMedia.instagram)
                   }>
                   <Image
                     style={{width: '100%', height: '100%'}}
                     resizeMode={'contain'}
                     source={require('../../images/instagram-sketched.png')}
                   />
                 </TouchableOpacity>
          // <AntDesign
          //   onPress={() =>
          //     Linking.openURL(route.params.TruckInfo.socialMedia.instagram)
          //   }
          //   name={'instagram'}
          //   color={'#212121'}
          //   size={responsiveFontSize(2.5)}
          // />
        ) : null}
        {route.params.TruckInfo.socialMedia.facebook ? (
                      <TouchableOpacity
                      style={{width:responsiveWidth(10),height:responsiveHeight(5)}}
                      onPress={() =>
                        Linking.openURL(route.params.TruckInfo.socialMedia.facebook)
                      }>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        resizeMode={'contain'}
                        source={require('../../images/facebook.png')}
                      />
                    </TouchableOpacity>
          // <AntDesign
          //   onPress={() =>
          //     Linking.openURL(route.params.TruckInfo.socialMedia.facebook)
          //   }
          //   name={'facebook-square'}
          //   color={'#212121'}
          //   size={responsiveFontSize(2.5)}
          // />
        ) : null}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    height: responsiveHeight(25),
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
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
    width: '30%',
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
  flexView1: {
    marginTop: responsiveHeight(5),
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CustomerSupplier;
