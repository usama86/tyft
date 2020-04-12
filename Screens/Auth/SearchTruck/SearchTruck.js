import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Map from '../../../Component/Maps';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Container from '../../../Component/Container';
import Button from '../../../Component/Button';
import Text from '../../../Component/Text';
import theme from '../../theme';
import * as RouteName from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const SearchTruck = ({navigation}) => {
  return (
    // <Container containerStyle={styles.ContainerStyles}>
    <SafeAreaView style={styles.parent}>
      <Header onPress={() => navigation.goBack()}>{'Search Truck'}</Header>
      <View
        style={{
          marginVertical: responsiveHeight(1),
          paddingHorizontal: responsiveWidth(5),
        }}>
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
      <Map />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MapStyle: {
    width: '60%',
    height: responsiveHeight(10),
  },
  flexView: {
    width: '100%',
    height: responsiveHeight(8),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: responsiveWidth(25),
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
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SearchTruck;
