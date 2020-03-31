import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Map from '../../../Component/Maps';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Container from '../../../Component/Container';
import Button from '../../../Component/Button';
import Text from '../../../Component/Text';
import theme from '../../theme';
import * as RouteName from './../../../Constants/RouteName';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const SearchTruck = ({navigation}) => {
  return (
    <Container containerStyle={styles.ContainerStyles}>
      <View style={styles.flexView}>
        <Button style={styles.button}>
          <Text style={styles.TextStyle} value={'Burger'} />
        </Button>
        <Button style={styles.button}>
          <Text style={styles.TextStyle} value={'Pizza'} />
        </Button>
        <Button style={styles.button}>
          <Text style={styles.TextStyle} value={'BBQ'} />
        </Button>
        <TouchableOpacity onPress={()=>navigation.navigate(RouteName.FINDFOODTRUCK)} >
          <Image
            style={{width: responsiveWidth(8), height: responsiveHeight(4)}}
            source={require('../../../images/filter.png')}
          />
        </TouchableOpacity>
      </View>
      <Map />
    </Container>
  );
};

const styles = StyleSheet.create({
  MapStyle: {
    width: '60%',
    height: responsiveHeight(10),
  },
  flexView: {
    width: '100%',
    height: responsiveHeight(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: '25%',
    height: responsiveHeight(7),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
  TextStyle: {
    color: 'white',
  },
});

export default SearchTruck;
