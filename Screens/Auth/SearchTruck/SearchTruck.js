import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
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
import SettingIcon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import moment from 'moment';
import url from '../Constants/constants';
const SearchTruck = ({navigation}) => {
  const [buttonData, setButtonData] = React.useState([]);
  const [Truck, setTruck] = React.useState([]);
  const [day, setDay] = useState(null);
  const [indicator, setIndicator] = React.useState(true);
  React.useEffect(() => {
    navigation.addListener('focus',()=>{
      getCusine();
      getAllTrucks();
    })
  }, []);
  const getAllTrucks = () => {
    axios
      .get(url + '/api/supplier/getalltruck')
      .then(async Response => {
        let ERROR = Response.data.code;
        let Trucks = Response.data.TruckInfo;
        if (ERROR !== 'ABT0001') {
          let filtered = Trucks.filter(item => item.status === 'Open');
          if (filtered.length > 0) {
            let currentDate = moment();
            let day = currentDate.format('dddd');
            setDay(day);
            setTruck(filtered);
          } else {
            console.log('in else of filter ');
            setTruck(null);
          }
        }
      })
      .catch(error => {
        // setisLoading(false);
        console.log(error);
      });
  };
  const getCusine = async () => {
    axios
      .get(url + '/api/servingcusine/getcusines')
      .then(async Response => {
        if (Response) {
          console.log(Response);
          if (Response.data.length > 0) {
            let res = await Response.data[0].cusine;
            await setButtonData(res);
          }
          setIndicator(false);
        } else {
          setIndicator(false);
        }
      })
      .catch(error => {
        console.log(error);
        setIndicator(false);
      });
  };

  return (
    // <Container containerStyle={styles.ContainerStyles}>
    <SafeAreaView style={styles.parent}>
      <Header NoIcon onPress={() => navigation.goBack()}>{'Search Truck'}</Header>
      {indicator ? (
        <ActivityIndicator
          size={'large'}
          color={'#000'}
          style={styles.indicator}
        />
      ) : (
        <View style={{color: 'red', height: responsiveHeight(90),}}>
          {/* <View
            style={{
              marginVertical: responsiveHeight(1),
              marginLeft: responsiveWidth(-7),
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{width: '80%'}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {buttonData
                  ? buttonData.map(data => (
                      <Button style={styles.button}>
                        <Text
                          style={styles.TextStyle}
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
          </View> */}
          <Map navigation={navigation} Trucks={Truck} />
        </View>
      )}
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
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SearchTruck;
