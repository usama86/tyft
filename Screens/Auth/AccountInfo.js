import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  SafeAreaView,
  Alert
} from 'react-native';
import Input from '../../Component/Input';
import Text1 from '../../Component/Text';
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
import url, {bold} from './Constants/constants';
import axios from 'axios';
import Modal from '../../Component/Modal';
import {Avatar, Icon} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal1 from 'react-native-modal';
import {List, ListItem} from 'native-base';
import {Language as Lan} from '../../Constants/LanguageChangeFunc';
import { Platform } from 'react-native';
const AccountInfo = ({navigation, route}) => {
  const [name, SetName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [showModal, setShowModal] = useState(false);
  const [profileName, setProfileName] = React.useState('');
  const [Language, setLanguage] = React.useState('');
  const [urls, setUrl] = React.useState(null);
  const [photo, setPhoto] = React.useState('');
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
        routes: [{name: Route.HOME}],
      }),
    );
    setShowModal(false);
    setisLogout(false);
  };
  const checkUserStatus = async () => {
    let userType = await AsyncStorage.getItem('userType');
    let photo = await AsyncStorage.getItem('profilePhoto');
    setPhoto(photo);
    if (userType !== null) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  };
  useEffect(() => {
    const _unsubscribe = navigation.addListener('focus', () => {
      checkUserStatus();
      getData();
    });
    return _unsubscribe;
  }, []);
  const getData = async () => {
    let names = await AsyncStorage.getItem('profileName');
    let emails = await AsyncStorage.getItem('email');
    //  await AsyncStorage.setItem('profileName' + '', usertoken.profileName);
    let phones = await AsyncStorage.getItem('phoneNumber');
    let photos = await AsyncStorage.getItem('profilePhoto');
    let language = await AsyncStorage.getItem('language');
    setUrl(photos)
    // console.log(photos);
    // setPhoto(photos);
    // setImage(photos);
    if (language) setLanguage(language);
    if (names) SetName(names);
    if (emails) setEmail(emails);
    if (phones) setPhone(phones);
  };
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      {LoggedIn ? (
        <Header
          NoIcon
          // logout
          // Logout={() => setisLogout(true)}
          settings
          onSettingsPress={() => setShowModal(true)}
          navigation={navigation}
          onPress={() => navigation.goBack()}>
          {Lan['Account']}
        </Header>
      ) : (
        <Header navigation={navigation} onPress={() => navigation.goBack()}>
          {Lan['Account']}
        </Header>
      )}
      {LoggedIn ? (
        <Ui
          // onPressButton={() => {
          //   navigation.navigate('Account', {
          //     name: name,
          //     email: email,
          //     phone: phone,
          //     Language: Language,
          //   });
          // }}
          isLoading={isLoading}
          ContainerStyle={styles.ContainerStyle}
          TextShow
          noShowButton
          // ButtonText={'Edit Profile'}
          TextSpace={styles.TextSpace}
          TextViewStyle={styles.TextViewStyle}>
          <View style={styles.InputMainView}>
            <View style={styles.header}>
              <View style={styles.rowView}>
             
                  <Avatar
                    source={ urls? {uri:urls}:require('../../images/2.jpg')}
                    // style={{marginLeft:2}}
                    // icon={{name: 'user', type: 'font-awesome'}}
                    // showEditButton
                    rounded
                    // onPress={SelectImage}
                    size={responsiveFontSize(13)}
                  />
           

                {/* imageProps={{uri:truckData.truckLogo}} */}
                <View style={{marginLeft: 20}}>
                  <Text1
                    style={{fontSize: responsiveFontSize(2)}}
                    value={name}
                  />
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
              <Text1
                value={Lan['Personal Details']}
                style={{
                  color: '#B40E33',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.8),
                }}
              />
              <Text1
                value={email}
                style={{
                  color: 'black',
                  fontSize: responsiveFontSize(2),
                  marginTop: responsiveHeight(2),
                }}
              />
              <Text1
                value={phone}
                style={{
                  color: 'black',
                  fontSize: responsiveFontSize(2),
                  marginTop: responsiveHeight(1),
                }}
              />
              <Text1
                value={Language}
                style={{
                  color: 'black',
                  fontSize: responsiveFontSize(2),
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
            <Text1
              style={{
                textAlign: 'center',
                fontFamily: bold,
                fontSize: responsiveFontSize(2),
              }}
              value={Lan['Are you sure you want to Sign-out?']}
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
                <Text1
                  uppercase={false}
                  value={Lan['Yes']}
                  style={{
                    color: '#fff',
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                  }}
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
                <Text1
                  uppercase={false}
                  value={Lan['No']}
                  style={{
                    color: '#fff',
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                  }}
                />
              </Button>
            </View>
          </Modal>
          <Modal1
            onBackButtonPress={() => setShowModal(false)}
            onSwipeComplete={() => setShowModal(false)}
            swipeDirection={'down'}
            isVisible={showModal}
            backdropColor="rgba(0,0,0,0.8)"
            animationIn="slideInUp"
            // animationOut="slideInDown"
            animationInTiming={200}
            animationOutTiming={200}
            backdropTransitionInTiming={200}
            backdropTransitionOutTiming={200}>
            <View style={[styles.ModalConatiner]}>
              <View style={styles.ClosingBar} />
              <ScrollView style={{marginTop: responsiveHeight(2)}}>
                <List>
                  <ListItem
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => setisLogout(true)}>
                    {/* <AntDesign
                  name={'edit'}
                  color={'grey'}
                  size={responsiveFontSize(2.5)}
                /> */}
                    <Text
                      style={{
                        color: 'grey',
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: bold,
                      }}>
                      {'Account Options'}
                    </Text>
                  </ListItem>
                  <ListItem
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('ChangePassword');
                    }}>
                    {/* <AntDesign
                  name={'edit'}
                  color={'grey'}
                  size={responsiveFontSize(2.5)}
                /> */}
                    <Text
                      style={{
                        color: 'grey',
                        fontFamily: bold,
                      }}>
                      {'Change Password'}
                    </Text>
                  </ListItem>
                  <ListItem
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={e => {
                      setShowModal(false);
                      // e.stopPropagation();
                      navigation.navigate('Account', {
                        name: name,
                        email: email,
                        phone: phone,
                        Language: Language,
                      });
                    }}>
                    {/* <AntDesign
                  name={'edit'}
                  color={'grey'}
                  size={responsiveFontSize(2.5)}
                /> */}
                    <Text
                      style={{
                        color: 'grey',
                        fontFamily: bold,
                      }}>
                      {'Update Profile'}
                    </Text>
                  </ListItem>
                  <ListItem
                    onPress={() => { Platform.OS ==='android'? setisLogout(true):    Alert.alert(
                      Lan['Are you sure you want to Sign-out?'],
                      "",
                      [
                        {
                          text: Lan['No'],
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: Lan['Yes'], onPress: Logout }
                      ]
                    );}}
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    {/* <Entypo
                  name={'trash'}
                  color={'red'}
                  size={responsiveFontSize(2.5)}
                /> */}
                    <Text
                      style={{
                        color: 'red',
                        fontFamily: bold,
                      }}>
                      {'Log Out'}
                    </Text>
                  </ListItem>
                  <ListItem
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => setShowModal(false)}>
                    {/* <Entypo
                  name={'cross'}
                  color={'grey'}
                  size={responsiveFontSize(2.5)}
                /> */}
                    <Text
                      style={{
                        color: 'grey',
                        fontFamily: bold,
                      }}>
                      {Lan['Cancel']}
                    </Text>
                  </ListItem>
                </List>
              </ScrollView>
            </View>
          </Modal1>
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
            <Text1
              style={{
                color: '#696969',
                fontSize: responsiveFontSize(2),
                fontFamily: bold,
              }}
              value={
                'A TYFT Account allows you to bookmark truck, review about them and make'
              }
            />
            <Text1
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
              <Text1 style={{color: '#fff'}} value={'SIGN IN NOW'} />
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
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
  TextFont: {
    fontFamily: 'Nunito Sans,sans-serif',
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
    fontFamily: bold,
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
  ModalConatiner: {
    top: responsiveHeight(35),
    width: responsiveWidth(100),
    height: responsiveHeight(50),
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 8,
  },
  ClosingBar: {
    height: responsiveHeight(1),
    width: responsiveWidth(15),
    borderRadius: 5,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginTop: responsiveHeight(1.5),
  },
  ImageContainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(50),
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 8,
  },
});
export default AccountInfo;
