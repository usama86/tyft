import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import Input from '../../Component/Input';
import Text from '../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Radio from '../../Component/Radio';
import Ui from '../../Component/Ui';
import Header from '../../Component/Header';
import Button from '../../Component/Button';
import AsyncStorage from '@react-native-community/async-storage';
import theme from '../theme';
import * as Route from '../../Constants/RouteName';
import url from './Constants/constants';
import axios from 'axios';
import Modal from '../../Component/Modal';
import {Avatar, Icon, ListItem} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
const AccountInfo = ({navigation}) => {
  const [name, SetName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [profileName, setProfileName] = React.useState('');
  const [Language, setLanguage] = React.useState('');
  const [urls, setUrl] = React.useState('');
  const [photo,setPhoto] =React.useState('')
  const [password, setPassword] = React.useState({
    value: null,
    errorText: null,
  });
  const [confirmPassword, setConfirmPassword] = React.useState({
    value: null,
    errorText: null,
  });
  const [LoggedIn, setLoggedin] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);
  const [update, setUpdated] = React.useState(null);
  const [img, setImage] = React.useState(null);
  const [islogout, setisLogout] = React.useState(null);
  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: Route.SIGNIN}],
      }),
    );
    setisLogout(false);
  };
  const checkUserStatus = async () => {
    let userType = await AsyncStorage.getItem('userType');
    if (userType !== null) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  };
  useEffect(() => {
    navigation.addListener('focus',()=>{
      checkUserStatus();
      getData();
    })
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
        setImage(response);
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
              console.log(result);
              let userId = await AsyncStorage.getItem('userID');
              axios
                .post(url + '/api/users/updateprofileimage', {
                  _id: userId,
                  imgUrl: result.url,
                })
                .then(async Response => {
                  console.log('Responsessss', Response.data.code);
                  let Code = Response.data.code;
                  if (Code === 'ABT0000') {
                    setUrl(img); //
                    // navigation.navigate(Route.SIGNIN);
                  } else {
                    console.log('NOT ADDEED');
                    // setisLoading(false);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
              // setImageUrl(result.url); updatetruckimage
              // setIsLoading(false);
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
  const getData = async () => {
    let id = await AsyncStorage.getItem('userID');
    let name = await AsyncStorage.getItem('userName');
    let emails = await AsyncStorage.getItem('email');
    //  await AsyncStorage.setItem('profileName' + '', usertoken.profileName);
    let phones = await AsyncStorage.getItem('phoneNumber');
    let photo = await AsyncStorage.getItem('profilePhoto');
    let language = await AsyncStorage.getItem('language');
    setPhoto(photo);
    setLanguage(language)
    //  let Language = await AsyncStorage.getItem('Language');
    //  setLanguage(Language)
    console.log(id);
    console.log(name);
    console.log(emails);
    console.log(phones);

    SetName(name);
    setEmail(emails);
    setPhone(phones);
    // axios
    //   .get(url + '/api/users/getuser', {
    //     email: emails,
    //   })
    //   .then(async Response => {
    //     console.log('Response of Get User', Response.data);
    //     setLanguage(Response.data[0].Language);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      {LoggedIn ? (
        <Header
          logout
          Logout={() => setisLogout(true)}
          navigation={navigation}
          onPress={() => navigation.goBack()}>
          {'Account'}
        </Header>
      ) : (
        <Header navigation={navigation} onPress={() => navigation.goBack()}>
          {'Account'}
        </Header>
      )}
      {LoggedIn ? (
        <Ui
          onPressButton={() => {
            navigation.navigate('Account', {
              name: name,
              email: email,
              phone: phone,
              Language: Language,
            });
          }}
          isLoading={isLoading}
          ContainerStyle={styles.ContainerStyle}
          TextShow
          ButtonText={'Edit Profile'}
          TextSpace={styles.TextSpace}
          TextViewStyle={styles.TextViewStyle}>
          <View style={styles.InputMainView}>
            <View style={styles.header}>
              <View style={styles.rowView}>
                <Avatar
                  source={img ? {uri: img.uri} : {uri:photo}}
                  icon={{name: 'user', type: 'font-awesome'}}
                  showEditButton
                  rounded
                  onPress={SelectImage}
                  size={responsiveFontSize(13)}
                />
                {/* imageProps={{uri:truckData.truckLogo}} */}
                <View style={{marginLeft: 20}}>
                  <Text style={styles.whiteText} bold value={name} />
                </View>
              </View>
            </View>

            <View
              style={{
                width: '370%',
                backgroundColor: '#e4e6eb',
                height: responsiveHeight(0.2),
                marginLeft: responsiveWidth(-36.2),
                marginTop: responsiveHeight(4),
              }}
            />
            <View
              style={{
                marginLeft: responsiveWidth(-21),
                marginTop: responsiveHeight(3),
              }}>
              <Text
                value={'Personal Details'}
                style={{color: '#B40E33'}}
                bold
              />
              <Text
                value={email}
                style={{
                  color: 'black',
                  fontSize: responsiveFontSize(1.8),
                  marginTop: responsiveHeight(2),
                }}
              />
              <Text
                value={phone}
                style={{
                  color: 'black',
                  fontSize: responsiveFontSize(1.8),
                  marginTop: responsiveHeight(1),
                }}
              />
              <Text
                value={Language}
                style={{
                  color: 'black',
                  fontSize: responsiveFontSize(1.8),
                  marginTop: responsiveHeight(1),
                }}
              />
            </View>
          </View>
          <Modal ModalContainer={styles.modalView} showModal={islogout}>
            <View style={styles.IconView}>
              <AntDesign
                name={'questioncircle'}
                color={'black'}
                size={responsiveFontSize(10)}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2),
              }}
              value={'Are you sure you wanna Signout?'}
            />
            <View style={styles.ButtonView}>
              <Button
                onPress={Logout}
                style={{
                  width: '40%',
                  height: responsiveHeight(6),
                  backgroundColor: 'rgb(193, 32, 38)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: responsiveHeight(4),
                }}
                rounded>
                <Text
                  uppercase={false}
                  value={'Yes'}
                  style={{color: '#fff', fontWeight: 'bold'}}
                />
              </Button>
              <Button
                onPress={() => setisLogout(false)}
                style={{
                  width: '40%',
                  height: responsiveHeight(6),
                  backgroundColor: 'rgb(193, 32, 38)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: responsiveHeight(4),
                }}
                rounded>
                <Text
                  uppercase={false}
                  value={'No'}
                  style={{color: '#fff', fontWeight: 'bold'}}
                />
              </Button>
            </View>
          </Modal>
        </Ui>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: responsiveHeight(10),
          }}>
          <Image
            resizeMode={'contain'}
            style={{width: '40%', height: '40%'}}
            source={require('../../images/2.jpg')}
          />
          <View
            style={{
              width: responsiveWidth(82),
              marginLeft: responsiveWidth(14),
            }}>
            <Text
              style={{
                color: '#696969',
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
              }}
              value={
                'A TYFT Account allows you to bookmark truck, review about them and make'
              }
            />
            <Text
              style={{
                color: '#696969',
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                marginLeft: responsiveWidth(22),
              }}
              value={'payment faster'}
            />
          </View>
          <View style={{marginTop: responsiveHeight(10)}}>
            <Button
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={styles.button1}>
              <Text style={{color: '#fff'}} value={'SIGN IN NOW'} />
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(0),
  },
  TextViewStyle: {
    // width: responsiveWidth(60)
  },
  Input: {
    marginTop: responsiveHeight(3),
  },
  radioView: {
    marginLeft: responsiveWidth(15),
    marginTop: responsiveHeight(5),
    flexDirection: 'row',
  },
  TextSpace: {
    // paddingLeft:responsiveWidth(18)
  },
  button: {
    width: responsiveWidth(50),
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    marginLeft: responsiveWidth(5),
  },
  IconView: {
    width: '90%',
    alignSelf: 'center',
    height: responsiveHeight(15),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
  },
  UpdatedText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
    color: '#1AB975',
    textAlign: 'center',
  },
  modalView: {
    paddingVertical: responsiveHeight(3),
  },
  button1: {
    width: responsiveWidth(70),
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    marginLeft: responsiveWidth(3),
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 20,
    marginLeft: responsiveWidth(-23),
    paddingBottom: 20,
    width: responsiveWidth(50),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ContainerStyle: {
    //   backgroundColor:'red',
    marginTop: responsiveHeight(3),
  },
  ButtonView: {
    height: responsiveHeight(8),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default AccountInfo;
