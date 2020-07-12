import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import Container from '../../../Component/Container';
import Text from '../../../Component/Text';
import theme from '../../theme';
import {SearchBar, Rating, colors} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Switch} from 'react-native-switch';
import Button from '../../../Component/Button';
import CountButton from '../../../Component/CountButton';
import Modal from '../../../Component/Modal';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
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
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
// import Button from '../../../Component/Button'
const VeggieWisper = ({navigation, route}) => {
  const [ToggleSwitch, setToggleSwitch] = useState(false);
  const [button, setButton] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [userInfo, setUserInfo] = useState([]);
  const [TruckInfo, setTruckInfo] = useState({});
  const [indicator, setIndicator] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [markerLat, setMarkerLat] = React.useState(30.3753);
  const [markerLong, setMarkerLong] = React.useState(69.3451);
  const [mapReady, setMapReady] = React.useState(true);
  const [Lat, setLat] = React.useState(0.0);
  const [Long, setLong] = React.useState(0.0);
  const [urls, setUrl] = useState(null);
  const mapView = useRef();
  const initialRegion = {
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.17323,
  };
  const LATITUDE_DELTA = 0.015;
  const LONGITUDE_DELTA = 0.0121;
  useEffect(() => {
    getUserDetails();
  }, []);
  const setLocation = async () => {
    let TruckId = await AsyncStorage.getItem('TruckID');
    axios
      .post(url + '/api/supplier/setlocation', {
        TruckID: TruckId,
        longitude: Long,
        latitude: Lat,
      })
      .then(async Response => {
        if (Response.data.code !== 'ABT0001') {
          console.log('LAT LONG UDATED');
          setVisibleModal(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setMarkerLat(parseFloat(position.coords.latitude));
        setMarkerLong(parseFloat(position.coords.longitude));
        setLat(parseFloat(position.coords.latitude));
        setLong(parseFloat(position.coords.longitude));
        await setRegionInMap(region);
        console.log('CURRENT LOCATION IN GETLOCATION', region);
      },
      error => console.log('this is ERROR', error),
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 2000,
      },
    );
  };
  const onMarkerDragEnd = e => {
    console.log('dragEnd', e.nativeEvent.coordinate);
    setLat(e.nativeEvent.coordinate.latitude);
    setLong(e.nativeEvent.coordinate.longitude);
  };

  const setRegionInMap = region => {
    if (mapReady) {
      console.log('map is ready', region);
      try {
        setTimeout(() => mapView.current.animateToRegion(region), 30);
      } catch (error) {
        Alert('Cannot Access Current Location Please Try Again.');
      }
    } else {
      console.log('NOOO');
    }
  };
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
          await AsyncStorage.setItem('TruckID' + '', res.TruckInfo[0]._id);
          await AsyncStorage.setItem('MenuID' + '', res.TruckInfo[0].MenuID);
          await setVisibleModal(true);
          await getCurrentLocation();
        } else {
          setIndicator(false);
        }
      })
      .catch(error => {
        // console.log(error);
        Alert.alert(error.toString());
      });
  };
  const openMap = (val, truckID) => {
    updateStatus(val, truckID);
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
          if (val) {
            setVisibleModal(true);
            getCurrentLocation();
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const SelectImage = () => {
    const options = {
      title: 'Select or Capture Your Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        // console.log(response)
        const img = response;
        try {
          // setIsLoading(true);
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'multipart/form-data');
          myHeaders.append('Accept', 'application/json');
          // let file = await uriToBlob(val.uri)
          var formdata = new FormData();
          formdata.append('file', {
            uri: img.uri,
            type: 'image/jpeg',
            name: img.fileName,
          });
          formdata.append('upload_preset', 'tyftBackend');
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
          };
          fetch(
            'https://api.cloudinary.com/v1_1/hmrzthc6f/image/upload',
            requestOptions,
          )
            .then(response => response.json())
            .then(async(result) => {
              console.log(result);
             

              let TruckId = await AsyncStorage.getItem('TruckID');
              axios
                .post(url + '/api/supplier/updatecoverimage', {
                  _id: TruckId,
                  imgUrl: result.url
                })
                .then(async Response => {
                  console.log('Responsessss', Response.data.code);
                  let Code = Response.data.code;
                  if (Code === 'ABT0000') {
                    setUrl(img); //
                    // navigation.navigate(Route.SIGNIN);
                  } else {
                    console.log('NOT ADDEED');
                    // setisLoading(false);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
              // setImageUrl(result.url); updatetruckimage
              // setIsLoading(false);
            })
            .catch(error => {
              console.log('error', error);
              // setIsLoading(false);
            });
        } catch (e) {
          console.log('error => ', e);
        }
      }
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
          resizeMode={'contain'}
            style={styles.image}
            source={{uri: urls? urls.uri : TruckInfo.coverPhoto}}>
            <Header isHome onPress={() => navigation.openDrawer()}>
              {'Home'}
            </Header>
            <Entypo
              style={{alignSelf: 'flex-end', marginRight: responsiveWidth(4)}}
              name={'pencil'}
              onPress={SelectImage}
              color={'#B40E33'}
              size={responsiveFontSize(4)}
            />
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
              onValueChange={val => openMap(val, TruckInfo._id)}
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
        <TouchableOpacity
          onPress={() => Linking.openURL(TruckInfo.truckWebsite)}
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
            value={TruckInfo.truckWebsite}
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
            value={TruckInfo.truckContact}
          />
        </View>
        <View style={styles.SocialIcons}>
          {TruckInfo.socialMedia.twitter ? (
            <TouchableOpacity
              style={{width: responsiveWidth(10), height: responsiveHeight(5)}}
              onPress={() => Linking.openURL(TruckInfo.socialMedia.twitter)}>
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode={'contain'}
                source={require('../../../images/twitter.png')}
              />
            </TouchableOpacity>
          ) : null}
          {TruckInfo.socialMedia.instagram ? (
            <TouchableOpacity
              style={{width: responsiveWidth(10), height: responsiveHeight(5)}}
              onPress={() => Linking.openURL(TruckInfo.socialMedia.instagram)}>
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode={'contain'}
                source={require('../../../images/instagram-sketched.png')}
              />
            </TouchableOpacity>
          ) : null}
          {TruckInfo.socialMedia.facebook ? (
            <TouchableOpacity
              style={{width: responsiveWidth(10), height: responsiveHeight(5)}}
              onPress={() => Linking.openURL(TruckInfo.socialMedia.facebook)}>
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode={'contain'}
                source={require('../../../images/facebook.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <Modal showModal={visibleModal}>
          <View style={styles.crossView}>
            <TouchableOpacity onPress={() => setVisibleModal(false)}>
              <Entypo
                name={'circle-with-cross'}
                color={'#212121'}
                size={responsiveFontSize(3.5)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mapcon}>
            <MapView
              showsBuildings={true}
              showsTraffic={true}
              initialRegion={initialRegion}
              onMapReady={() => {
                setMapReady(true);
              }}
              loadingBackgroundColor={'#5465'}
              loadingEnabled={true}
              loadingIndicatorColor={'#000'}
              zoomEnabled={true}
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              showsUserLocation={true}
              followUserLocation={true}
              // onRegionChange={this.onRegionChange}
              // onRegionChangeComplete={this.onRegionChangeComplete}
              ref={mapView}>
              <Marker
                coordinate={{
                  latitude: markerLat,
                  longitude: markerLong,
                }}
                onDragEnd={e => onMarkerDragEnd(e)}
                draggable
              />
            </MapView>
          </View>
          <View style={styles.InstructionView}>
            <Text
              style={styles.InstructionText}
              value={'Please Drag the Marker to Select Your Current Location.'}
            />
          </View>
          <View style={styles.ButtonView}>
            <Button onPress={setLocation} style={styles.Button}>
              <Text style={{color: '#fff'}} value={'Save'} />
            </Button>
          </View>
        </Modal>
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
    height: '100%',
    resizeMode: 'contain',
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
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  crossView: {
    width: '100%',
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: responsiveWidth(2),
  },
  mapcon: {
    ...StyleSheet.absoluteFillObject,
    position: 'relative',
    height: responsiveHeight(60),
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  InstructionView: {
    width: '100%',
    paddingVertical: responsiveHeight(2),
  },
  InstructionText: {
    color: '#000',
    textAlign: 'center',
  },
  ButtonView: {
    height: responsiveHeight(10),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VeggieWisper;
