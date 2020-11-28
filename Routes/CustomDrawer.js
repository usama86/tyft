import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {Text, Avatar, Icon, ListItem} from 'react-native-elements';
import * as Screens from './../Constants/RouteName';
import ProfileIcon from 'react-native-vector-icons/AntDesign';
import SignoutIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MC from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SLI from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import url from '../Screens/Auth/Constants/constants';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
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
  const [urls, setUrl] = useState('');
  useEffect(() => {
    getUserDetails();
  }, []);
  const SelectImage = () => {
    const options = {
      title: 'Select or Capture Your Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        // console.log(route.params.ID)
        const img = response;
        // TruckID: route.params.ID,
        try {
          // setIsLoading(true);
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'multipart/form-data');
          myHeaders.append('Accept', 'application/json');
          // let file = await uriToBlob(val.uri)
          var formdata = new FormData();
          formdata.append('file', {
            uri: img.uri,
            type: 'image/jpeg',
            name: img.fileName,
          });
          formdata.append('upload_preset', 'tyftBackend');
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
          };
          fetch(
            'https://api.cloudinary.com/v1_1/hmrzthc6f/image/upload',
            requestOptions,
          )
            .then(response => response.json())
            .then(async result => {
              let TruckId = await AsyncStorage.getItem('TruckID');
              axios
                .post(url + '/api/supplier/updatetrucklogo', {
                  _id: TruckId,
                  imgUrl: result.url,
                })
                .then(async Response => {
                  let Code = Response.data.code;
                  if (Code === 'ABT0000') {
                    setUrl(img); //
                    // navigation.navigate(Route.SIGNIN);
                  } 
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log('error', error);
              // setIsLoading(false);
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
              source={urls.uri ? {uri: urls.uri} : {uri: urls}}
              rounded
              size="large"
            />
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
            leftAvatar={<Icon name="comment" type="fontAwesome" size={25} />}
            onPress={() => navigation.navigate(Screens.CUSTOMERREVIEWD)}
          />

          <ListItem
            title={'Menu'}
            leftAvatar={
              <Icon name="restaurant-menu" type="MaterialIcons" size={25} />
            }
            onPress={() => navigation.navigate(Screens.MENUSETTINGDRAWER)}
          />
          <ListItem
            title={'Item Categories'}
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
            title={'Social Media'}
            leftAvatar={<SLI name={'social-stumbleupon'} size={25} />}
            onPress={() => navigation.navigate('SocialMediaDrawer')}
          />
          <ListItem
            title={'Serving Cusines'}
            leftAvatar={<Entypo name={'bowl'} size={25} />}
            onPress={() => navigation.navigate('ServingCusineDrawer')}
          />
          <ListItem
            title={'Change Password'}
            leftAvatar={<MaterialCommunityIcons name={'onepassword'} size={25} />}
            onPress={() => navigation.navigate('ChangePasswords')}
          />
          <ListItem
            title={'Contact Us'}
            leftAvatar={<ProfileIcon name={'contacts'} size={25} />}
             onPress={() => navigation.navigate('ContactUs')}
          />
          <ListItem
            title={'Signout'}
            leftAvatar={<SignoutIcon name={'sign-out'} size={25} />}
            onPress={Logout}
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
