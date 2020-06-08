import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Text, Avatar, Icon, ListItem} from 'react-native-elements';
import * as Screens from './../Constants/RouteName';
import ProfileIcon from 'react-native-vector-icons/AntDesign';
import SignoutIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MC from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import url from '../Screens/Auth/Constants/constants';
import axios from 'axios';
const CustomDrawer = ({navigation, route}) => {
  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Auth', {screen: 'Auth'});
  };
  const [userInfo, setUserInfo] = useState([]);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [truckData,setTruckData] = useState([])

  const [urls,setUrl] =useState('');
  useEffect(() => {
    getUserDetails(); 
  }, []);
  const getUserDetails = async () => {
    let userId = await AsyncStorage.getItem('userID');
    axios
      .post(url + '/api/supplier/getsupplier', {id: userId})
      .then(async Response => {
        if (Response.data.code !== 'ABT0001') {
          let res = Response.data;
          let newArr = [{...res.Supplier[0], TruckInfo: res.TruckInfo}];
          setUserInfo(newArr); 
          setName(res.Supplier[0].profileName); 
          setPhone(res.Supplier[0].phoneNumber);
          setEmail(res.Supplier[0].email);
          setTruckData(res.TruckInfo)
          setUrl(res.TruckInfo[0].truckLogo) 
          console.log(res.TruckInfo[0].truckLogo) 
          await AsyncStorage.setItem('TruckID' + '', res.TruckInfo[0]._id);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.rowView}>
            <Avatar source={{uri:urls}} rounded size="large" />
            <View style={{marginLeft: 20}}>
              <Text style={styles.whiteText}>{name}</Text>
              <Text style={styles.whiteText}>{email}</Text>
              <Text style={styles.whiteText}>{phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <ListItem
            title={'Home'}
            leftAvatar={<SignoutIcon name={'home'} size={25} />}
            onPress={() => navigation.navigate(Screens.VEGGIEWISPER)}
          />
          <ListItem
            title={'Schedule'}
            leftAvatar={<AntDesign name={'clockcircle'} size={25} />}
            onPress={() =>
              navigation.navigate(Screens.SCHEDULED, {
                schedule: userInfo[0].TruckInfo[0].schedule,
              })
            }
          />
          <ListItem
            title={'Customer Reviews'}
            leftAvatar={
              <Icon name="comment" type="fontAwesome" size={25} />
            }
            onPress={() => navigation.navigate(Screens.CUSTOMERREVIEWD)}
          />

          <ListItem
            title={'Menu'}
            leftAvatar={  <Icon name="restaurant-menu" type="MaterialIcons" size={25} />}
            onPress={() => navigation.navigate(Screens.MENUSETTINGDRAWER)}
          />
          <ListItem
            title={'Item Categories'}
            leftAvatar={<MC name={'food-fork-drink'} size={25} />}
            onPress={() => navigation.navigate(Screens.ITEMCATEGORYD)}
          />
          <ListItem
            title={'Profile'}
            leftAvatar={<ProfileIcon name={'user'} size={25} />}
            onPress={() => navigation.navigate(Screens.PROFILED,{UserData:userInfo})}
          />
          <ListItem
            title={'Contact Us'}
            leftAvatar={<ProfileIcon name={'contacts'} size={25} />}
            onPress={() => navigation.navigate('sign-out')}
          />
          <ListItem
            title={'Signout'}
            leftAvatar={<SignoutIcon name={'sign-out'} size={25} />}
            onPress={Logout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    // flexDirection: 'column',
  },
  header: {
    backgroundColor: 'black',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 3,
  },
  whiteText: {
    color: '#fff',
  },
});

export default CustomDrawer;
