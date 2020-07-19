import PropTypes from 'prop-types';
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'native-base';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import * as RouteName from '../Constants/RouteName';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {showLocation} from 'react-native-map-link';
import moment from 'moment';
const Maps = ({MapContainerStyle, Trucks, navigation}) => {
  const [mapReady, setMapReady] = React.useState(true);
  const [Lat, setLat] = React.useState(0.0);
  const [Long, setLong] = React.useState(0.0);
  const [LoadingMap, setLoadingMap] = React.useState(false);
  const mapView = useRef();
  const initialRegion = {
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.17323,
  };
  const LATITUDE_DELTA = 0.015;
  const LONGITUDE_DELTA = 0.0121;

  const setRegionInMap = async region => {
    console.log('in SET REgin\n\n\n');

    if (mapReady) {
      console.log('map is ready', region);

      setTimeout(() => {
        mapView.current.animateToRegion(region), 30;
      });
    } else {
      console.log('NOOO');
    }
  };
  useEffect(() => {
    // navigation.addListener('focus',()=>{
    getCurrentLocation();
    // })
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
  const getCurrentLocation = async () => {
    setLoadingMap(true);
    console.log('hi in get Current');
    await Geolocation.getCurrentPosition(
      async position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        await setLat(position.coords.latitude);
        await setLong(position.coords.longitude);
        await setLoadingMap(false);
        await setRegionInMap(region);
        // await console.log('CURRENT LOCATION IN GETLOCATION', region);
      },
      error => console.log('this is ERROR', error),
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 2000,
      },
    );
  };
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
       if(startTime<=currentTime && currentTime <=endTime){
            console.log('Between')
            return 'Open'
       }
       else{
        console.log('No Between')
         return 'Close'
       }
    } else {
      return 'Close';
    }

    // return currentTime.toString();
  };
  return (
    <View style={[styles.mapcon, MapContainerStyle]}>
      <MapView
        showsBuildings={true}
        showsCompass={true}
        showsTraffic={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={initialRegion}
        onMapReady={() => {
          setMapReady(true);
        }}
        ref={mapView}>
        {Trucks ? (
          Trucks.map((item, index) => {
            console.log('item=>>>', item);
            if (item.latitude && item.longitude) {
              return (
                <Marker
                  coordinate={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      width: responsiveWidth(15),
                      height: responsiveHeight(5),
                    }}
                    source={require('../images/delivery-truck.png')}
                  />
                  <Callout
                    onPress={() =>
                      navigation.navigate('Search', {
                        screen: RouteName.CUSTOMERSUPPLIER,
                        params: {TruckInfo: item, openMap: openMap},
                      })
                    }
                    tooltip={true}>
                    <View style={styles.BOX}>
                      <Text style={{paddingBottom: responsiveHeight(10)}}>
                        <Image
                          style={{
                            height: responsiveHeight(15),
                            width: responsiveWidth(30),
                          }}
                          source={{uri: item.coverPhoto}}
                          resizeMode={'contain'}
                        />
                      </Text>
                      <View
                        style={{
                          width: responsiveWidth(40),
                          paddingLeft: responsiveWidth(2),
                        }}>
                        <Text style={styles.TruckName}>{item.truckName}</Text>
                        <Text
                          style={[
                            item.status === 'Close'
                              ? {color: 'red'}
                              : {color: 'green'},
                          ]}>
                          {getStatus(item, index)}
                        </Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              );
            }
          })
        ) : (
          <Text style={styles.NoTruckText}>{'No Trucks Available'}</Text>
        )}
      </MapView>
      {LoadingMap ? (
        <View style={styles.LoadingView}>
          <ActivityIndicator
            animating={LoadingMap}
            style={styles.indicator}
            color={'red'}
            size={'small'}
          />
          <Text style={{marginTop: responsiveHeight(7)}}>
            {'Fetching Current Location Please Wait.'}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

Maps.propTypes = {
  MapContainerStyle: PropTypes.object,
};
Maps.defaultProps = {
  MapContainerStyle: {
    width: '100%',
    height: responsiveHeight(88),
  },
};

const styles = StyleSheet.create({
  mapcon: {
    ...StyleSheet.absoluteFillObject,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  BOX: {
    elevation: 5,
    borderRadius: 15,
    width: responsiveWidth(70),
    height: responsiveHeight(15),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TruckName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  NoTruckText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 5,
    textAlign: 'center',
    marginTop: responsiveHeight(30),
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  LoadingView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Maps;
