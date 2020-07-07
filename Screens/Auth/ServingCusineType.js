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
const FindFoodTruck = ({navigation, route}) => {
  const [indicator, setIndicator] = useState(true);
  const [CusineName, setCusinename] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    getCusine();
  }, []);

  const [Data, setData] = useState([]);
  const getCusine = async () => {
    axios
      .get(url + '/api/servingcusine/getcusines')
      .then(async Response => {
        if (Response) {
          console.log('Serving CUSINESS TYPE', Response.data);
          if (Response.data.length > 0) {
            let res = Response.data[0].cusine;
            setData(res);
          } else {
            setData(null);
          }
          // let newArr = [{...res.Supplier[0], TruckInfo: res.TruckInfo}];
          // setUserInfo(newArr);
          // setTruckInfo(res.TruckInfo[0]);
          setIndicator(false);
          // await AsyncStorage.setItem('TruckID'+'',res.TruckInfo[0]._id);
          // await AsyncStorage.setItem('MenuID'+'',res.TruckInfo[0].MenuID);
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
    newArr[index].checked = !newArr[index].checked;
    if (newArr[index].checked) {
      let dupSelected = [];
      dupSelected.push(...selectedItems, newArr[index].cusineName);
      setSelectedItems(dupSelected);
    }
    setData(newArr);
    // console.log('Cusine Name', newArr[index].cusineName);

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
                navigation.navigate(RouteName.FINDFOODTRUCK, {
                  CusineName: Data,
                  selectedItems: selectedItems,
                });
                route.params.onFilterSearch(selectedItems);
              }}
              style={[styles.buttonStyle2]}
              rounded>
              <Text style={{color: '#fff'}} uppercase={false} value={'Apply'} />
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
