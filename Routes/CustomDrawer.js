import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import {Text, Avatar, Icon, ListItem} from 'react-native-elements';
import * as Screens from './../Constants/RouteName';
import ProfileIcon from 'react-native-vector-icons/AntDesign';
import SignoutIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MC from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SLI from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import url from '../Screens/Auth/Constants/constants';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import {Language} from '../Constants/LanguageChangeFunc';
import {ActivityIndicator} from 'react-native-paper';
const CustomDrawer = ({navigation, route}) => {
  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Auth', {screen: 'Auth'});
  };
  const [userInfo, setUserInfo] = useState([]);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [truckData, setTruckData] = useState([]);
  const [urls, setUrl] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    getUserDetails();
  }, []);
  const SelectImage = () => {
    const options = {
      title: Language['Select or Capture Your Image'],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        setLoading(true);
        // // console.log(response)
        const img = response;
        try {
          console.log('IMAGES OBJECT', img);
          var formdata = new FormData();
          let path = img.uri;
          if (Platform.OS === 'ios') {
            path = '~' + path.substring(path.indexOf('/Documents'));
          }
          if (!img.fileName) {
            img.fileName = path.split('/').pop();
          }
          formdata.append('file', {
            uri: img.uri,
            type: img.type,
            name: img.fileName,
          });
          console.log('form dat', formdata);
          formdata.append('upload_preset', 'tyftBackend');
          axios
            .post(url + '/api/general/uploadImage', formdata)
            .then(async Response => {
              console.log('FORM DARA', formdata);
              let Code = Response.data.code;
              let urls = Response.data.url;
              console.log('IMAGE URLS', urls);
              if (Code === 'ABT0000') {
                // setUrl(img); //
                let TruckId = await AsyncStorage.getItem('TruckID');
                axios
                  .post(url + '/api/supplier/updatetrucklogo', {
                    _id: TruckId,
                    imgUrl: urls,
                  })
                  .then(async Response => {
                    let Code = Response.data.code;
                    if (Code === 'ABT0000') {
                      setLoading(false);
                      setUrl(urls); //
                    } else {
                      setLoading(false);
                    }
                  })
                  .catch(error => {
                    setLoading(false);
                    console.log(error);
                  });
              } else {
                setLoading(false);
              }
            })
            .catch(error => {
              setLoading(false);
              console.log('FORM DATA ERROR', error);
            });
        } catch (e) {
          console.log('error => ', e);
        }
      }
    });
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
          setName(res.Supplier[0].profileName);
          setPhone(res.Supplier[0].phoneNumber);
          setEmail(res.Supplier[0].email);
          setTruckData(res.TruckInfo);
          setUrl(res.TruckInfo[0].truckLogo);
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
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.rowView}>
              <Avatar
                onPress={SelectImage}
                icon={{name: 'user', type: 'font-awesome'}}
                showEditButton
                onEditPress={SelectImage}
                source={
                  urls
                    ? {uri: urls}
                    : {
                        uri:
                          'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                      }
                }
                rounded
                size="large"
              />
       {loading && <ActivityIndicator style={{position:'absolute',left:responsiveWidth(5)}} color={'red'} />}
              <View style={{marginLeft: 20, width: '60%'}}>
                <Text style={styles.whiteText} numberOfLines={1}>
                  {name}
                </Text>
                <Text style={styles.whiteText} numberOfLines={1}>
                  {email}
                </Text>
                <Text style={styles.whiteText} numberOfLines={1}>
                  {phone}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <ListItem
              title={Language['Home']}
              leftAvatar={<SignoutIcon name={'home'} size={25} />}
              onPress={() => navigation.navigate(Screens.VEGGIEWISPER)}
            />
            <ListItem
              title={Language['Schedule']}
              leftAvatar={<AntDesign name={'clockcircle'} size={25} />}
              onPress={() =>
                navigation.navigate(Screens.SCHEDULED, {
                  schedule: userInfo[0].TruckInfo[0].schedule,
                })
              }
            />
            <ListItem
              title={Language['Customer Reviews']}
              leftAvatar={<Icon name="comment" type="fontAwesome" size={25} />}
              onPress={() => navigation.navigate(Screens.CUSTOMERREVIEWD)}
            />

            <ListItem
              title={Language['Menu']}
              leftAvatar={
                <Icon name="restaurant-menu" type="MaterialIcons" size={25} />
              }
              onPress={() => navigation.navigate(Screens.MENUSETTINGDRAWER)}
            />
            <ListItem
              title={'Menu Categories'}
              leftAvatar={<MC name={'food-fork-drink'} size={25} />}
              onPress={() => navigation.navigate(Screens.ITEMCATEGORYD)}
            />
            <ListItem
              title={'Truck Profile'}
              leftAvatar={<ProfileIcon name={'user'} size={25} />}
              onPress={() =>
                navigation.navigate(Screens.PROFILED, {truckData: truckData})
              }
            />
            <ListItem
              title={Language['Social Media']}
              leftAvatar={<SLI name={'social-stumbleupon'} size={25} />}
              onPress={() => navigation.navigate('SocialMediaDrawer')}
            />
            <ListItem
              title={'Serving Cusines'}
              leftAvatar={<Entypo name={'bowl'} size={25} />}
              onPress={() => navigation.navigate('ServingCusineDrawer')}
            />
            <ListItem
              title={Language['Contact Us']}
              leftAvatar={<ProfileIcon name={'contacts'} size={25} />}
              onPress={() => navigation.navigate('ContactUs')}
            />
          </View>
        </ScrollView>
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
    width: '100%',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flex: 3,
  },
  whiteText: {
    color: '#fff',
  },
});

export default CustomDrawer;
