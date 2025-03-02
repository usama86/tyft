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
import url from './Constants/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Language } from '../../Constants/LanguageChangeFunc';
const FindFoodTruck = ({navigation, route}) => {
  const [indicator, setIndicator] = useState(true);
  const [CusineName, setCusinename] = useState([]);
  const [Datas, setDatas] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    navigation.addListener('focus', () => {
      getCusine();
      getFavouriteRestaurants();
      console.log('hhh');
    });
  }, []);

  const [Data, setData] = useState([]);
  const getFavouriteRestaurants = async () => {
    let UserID = await AsyncStorage.getItem('userID');
    console.log(UserID);
    axios
      .post(url + '/api/supplier/getfavoritetruck', {_id: UserID})
      .then(async Response => {
        let ERROR = Response.data.code;
        let Favourites = Response.data.records;
        if (ERROR !== 'ABT0001') {
          setRestaurants(Favourites);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getCusine = async () => {
    axios
      .get(url + '/api/servingcusine/getcusines')
      .then(async Response => {
        if (Response) {
          if (Response.data.length > 0) {
            let res = Response.data[0].cusine;
            if (route.params.uniqueProps !== undefined) {
              for (let k = 0; k < res.length; k++) {
                if (
                  route.params.uniqueProps.find(
                    (a, i) => a === res[k].cusineName,
                  )
                ) {
                  res[k].checked = true;
                }
              }
            }
            setData(res);
          } else {
            setData(null);
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
  const Checked = (item, index) => {
    let newArr = [...Data];
    let dupSelected = [...selectedItems];
    newArr[index].checked = !newArr[index].checked;
    if (newArr[index].checked) {
      dupSelected.push(newArr[index].cusineName);
    } else {
      dupSelected.splice(index, 1);
    }
    setData(newArr);
    setSelectedItems(dupSelected);
  };
  const PrintCard = (item, index) => (
    <TouchableOpacity
      onPress={() => Checked(item, index)}
      activeOpacity={0.8}
      style={[
        styles.MainView,
        item.checked
          ? {backgroundColor: theme.colors.primary, borderWidth: 0}
          : null,
      ]}>
      <Text
        style={[item.checked ? {color: 'white'} : null]}
        value={item.cusineName}
      />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.parent}>
      <Header onPress={() => navigation.goBack()}>
        {'Serving By Cuisine Type'}
      </Header>
      {indicator ? (
        <ActivityIndicator
          size={'large'}
          color={'#000'}
          style={styles.indicator}
        />
      ) : Data ? (
        <>
          <View style={{height: responsiveHeight(70)}}>
            <ScrollView>
              <FlatList
                data={Data}
                numColumns={3}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                  paddingVertical: responsiveHeight(2),
                }}
                renderItem={({item, index}) => PrintCard(item, index)}
              />
            </ScrollView>
          </View>
          <View style={styles.ApplyButton}>
            <Button
              onPress={() => {
                navigation.navigate('Favourite', {
                  CusineName: Data,
                  selectedItems: selectedItems,
                });
                route.params.onFilterSearch(selectedItems, restaurants);
              }}
              style={[styles.buttonStyle2]}
              rounded>
              <Text style={{color: '#fff'}} uppercase={false} value={Language['Apply']} />
            </Button>
          </View>
        </>
      ) : (
        <View
          style={{
            width: '100%',
            height: responsiveHeight(10),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(30),
          }}>
          <Text bold value={'No Cusines Available'} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeadingContainer: {
    height: responsiveHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainView: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(25),
    height: responsiveHeight(6),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderColor: '#212121',
    borderWidth: 1,
    marginLeft: '6.25%',
    backgroundColor: '#fff',
  },
  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: responsiveHeight(6),
    borderRadius: 8,
    marginLeft: responsiveWidth(4),

    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'rgb(0, 0, 0)'
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ApplyButton: {
    height: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: responsiveHeight(6),
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'rgb(0, 0, 0)'
  },
});

export default FindFoodTruck;
