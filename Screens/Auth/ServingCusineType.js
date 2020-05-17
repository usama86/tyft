import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
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
const FindFoodTruck = ({navigation}) => {
  
  const [indicator, setIndicator] = useState(true);

  useEffect(() => {
    getCusine();
  }, []);

  const [Data, setData] = useState([]);
  const getCusine = async () => {
    axios
      .get(url + '/api/servingcusine/getcusines') 
      .then(async Response => {
        if (Response) {
          console.log(Response);
          let res = Response.data[0].cusine;
          setData(res);
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
      });
  }; 
  const Checked = index => {
    let newArr = [...Data];
    newArr[index].checked = !newArr[index].checked;
    setData(newArr);
  }; 
  const PrintCard = (item, index) => ( 
    <TouchableOpacity
      onPress={() => Checked(index)}
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
   { indicator ?  
        <ActivityIndicator
        size={'large'}
        color={'#000'}
        style={styles.indicator}
      />
   :
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
    }  
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
});

export default FindFoodTruck;
