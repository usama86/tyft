import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button} from 'native-base';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const Maps = ({MapContainerStyle}) => {
  return (
    <View style={[styles.mapcon, MapContainerStyle]}>
      <MapView
      showsBuildings={true}
      showsCompass={true}
      showsTraffic={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapView.Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={'$200.21'}></MapView.Marker>

        <MapView.Marker
          coordinate={{
            latitude: 37.792,
            longitude: -122.4324,
          }}
          title={'$100.21'}>
          </MapView.Marker>
      </MapView>
    </View>
  );
};

Maps.propTypes = {
  MapContainerStyle: PropTypes.object,
};
Maps.defaultProps = {
  MapContainerStyle:{
    width:'100%',
    height:responsiveHeight(87),
  }
};

const styles = StyleSheet.create({
  mapcon: {
    ...StyleSheet.absoluteFillObject,
     position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;
