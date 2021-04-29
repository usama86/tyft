import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
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
import url, {bold, normal} from './Constants/constants';
import axios from 'axios';
import Modal from '../../Component/Modal';
import {CommonActions} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {Language as Lan} from '../../Constants/LanguageChangeFunc';
const Account = ({navigation, route}) => {
  const [name, SetName] = React.useState({value: null, errorText: null});
  const [email, setEmail] = React.useState({value: null, errorText: null});
  const [phone, setPhone] = React.useState({value: null, errorText: null});
  const [password, setPassword] = React.useState({
    value: null,
    errorText: null,
  });
  const [confirmPassword, setConfirmPassword] = React.useState({
    value: null,
    errorText: null,
  });
  const [LoggedIn, setLoggedin] = React.useState(false);
  const [Language, setLanguage] = React.useState('English');
  const [isLoading, setisLoading] = React.useState(false);
  const [update, setUpdated] = React.useState(null);
  const [islogout, setisLogout] = React.useState(null);
  const [img, setImage] = React.useState(null);
  const [photo, setPhoto] = React.useState('');
  const [urls, setUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
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
    let photo = await AsyncStorage.getItem('profilePhoto');
    console.log('PHOTO HEREEE ALREADY', photo);
    setUrl(photo);
    // setPhoto(photo);
    if (userType !== null) {
      setLoggedin(true);
      SetName({value: route.params.name, errorText: null});
      setPhone({value: route.params.phone, errorText: null});
      setEmail({value: route.params.email, errorText: null});
      setLanguage(route.params.Language);
    } else {
      setLoggedin(false);
    }
  };
  const SelectImage = () => {
    const options = {
      title: Lan['Select or Capture Your Image'],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        setUrl(response.uri);
        setLoading(true);
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
                let userId = await AsyncStorage.getItem('userID');
                axios
                  .post(url + '/api/users/updateprofileimage', {
                    _id: userId,
                    imgUrl: urls,
                  })
                  .then(async Response => {
                    let Code = Response.data.code;
                    if (Code === 'ABT0000') {
                      setLoading(false);
                      setUrl(urls); //
                      await AsyncStorage.setItem('profilePhoto' + '', urls);
                      // navigation.navigate(Route.SIGNIN);
                    }
                  })
                  .catch(error => {
                    setLoading(false);
                    console.log(error);
                  });
              } else {
                setLoading(false);
                // setisLoading(false);
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
  const updateUser = async () => {
    if (!name.value) {
      SetName({value: null, errorText: 'Please Enter Name.'});
    }
    if (!email.value) {
      setEmail({value: null, errorText: 'Please Enter Email'});
    }
    if (!password.value) {
      setPassword({value: null, errorText: 'Please Enter Password'});
    }
    if (!phone.value) {
      setPhone({value: null, errorText: 'Please Enter Phone Number'});
    }
    else if (name.value && email.value && phone.value) {
      await setisLoading(true);
      let userID = await AsyncStorage.getItem('userID');
      axios
        .post(url + '/api/users/updateuser', {
          _id: userID,
          email: email.value,
          // password: password.value,
          profileName: name.value,
          phoneNumber: phone.value,
          // userType: 'Customer',
          Language: Language,
        })
        .then(async Response => {
          // await AsyncStorage.setItem('language' + '', Language);
          console.log(Response.data);
          let Code = Response.data.code;
          if (Code === 'ABT0000') {
            setisLoading(false);
            await AsyncStorage.setItem('profileName' + '', name.value);
            await AsyncStorage.setItem('email' + '', email.value);
            await AsyncStorage.setItem('phoneNumber' + '', phone.value);
            setUpdated(true);
            setTimeout(() => {
              setUpdated(false);
            }, 500);
            navigation.navigate('AccountInfo');
          } else {
            setisLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
          setisLoading(false);
        });
    }
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      checkUserStatus();
    });
  }, []);
  const changeEmail = e => {
    let EmailRegix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (EmailRegix.test(e)) {
      setEmail({value: e, errorText: null});
    } else if (e == '') {
      setEmail({value: e, errorText: null});
    } else if (!EmailRegix.test(e)) {
      setEmail({value: e, errorText: 'Please Enter Valid Email'});
    }
  };
  const changePassword = e => {
    let PasswordRegix = /^(?=.*\d).{8,100}$/;
    if (PasswordRegix.test(e)) {
      setPassword({value: e, errorText: null});
    } else if (e === '') {
      setPassword({value: e, errorText: null});
    } else if (!PasswordRegix.test(e)) {
      setPassword({
        value: e,
        errorText:
          'Password must be atleast 8 digits long and include atleast one numeric digit',
      });
    }
  };
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      {LoggedIn ? (
        <Header navigation={navigation} onPress={() => navigation.goBack()}>
          {Lan['Update Account']}
        </Header>
      ) : (
        <Header navigation={navigation} onPress={() => navigation.goBack()}>
          {Lan['Update Account']}
        </Header>
      )}

      {true ? (
        <Ui
          onPressButton={updateUser}
          isLoading={isLoading}
          ButtonText={Lan['Done']}
          TextShow={false}
          TextSpace={styles.TextSpace}
          TextViewStyle={styles.TextViewStyle}>
          <View style={styles.InputMainView}>
            <View style={[styles.rowView]}>
              <Avatar
                source={urls ? {uri: urls} : require('../../images/2.jpg')}
                // style={{marginLeft:2}}
                icon={{name: 'user', type: 'font-awesome'}}
                showEditButton
                rounded
                onPress={SelectImage}
                size={responsiveFontSize(13)}
              />
              {loading && <ActivityIndicator color={'#000'} />}
            </View>
            <Input
              rounded
              placeholder="Name"
              onChangeText={e => SetName({value: e, errorText: null})}
              value={name.value}
              style={styles.Input}
              errorText={name.errorText ? name.errorText : null}
            />
            <Input
              rounded
              placeholder={Lan['Email Address']}
              keyboardType={'email-address'}
              value={email.value}
              onChangeText={e => changeEmail(e)}
              errorText={email.errorText ? email.errorText : null}
              style={styles.Input}
            />
            <Input
              rounded
              placeholder={Lan['Cell Phone']}
              keyboardType={'phone-pad'}
              onChangeText={e => setPhone({value: e, errorText: null})}
              value={phone.value}
              errorText={phone.errorText ? phone.errorText : null}
              style={styles.Input}
            />
            {/* <Input
              secureTextEntry={true}
              rounded
              placeholder="Password"
              onChangeText={e => changePassword(e)}
              value={password.value}
              errorText={password.errorText ? password.errorText : null}
              style={styles.Input}
            />
            <Input
              secureTextEntry={true}
              rounded
              value={confirmPassword.value}
              onChangeText={e =>
                setConfirmPassword({value: e, errorText: null})
              }
              errorText={
                confirmPassword.errorText ? confirmPassword.errorText : null
              }
              placeholder="Re-enter Password"
              style={styles.Input}
            /> */}
          </View>

          {/* <View style={styles.radioView}>
            <Radio
              selected={Language === 'English' ? true : false}
              onPress={e => {
                setLanguage('English');
              }}
            />
            <Text value={'English'} style={{marginLeft: responsiveWidth(2)}} />

            <Radio
              selected={Language === 'Spanish' ? true : false}
              onPress={() => {
                setLanguage('Spanish');
              }}
              style={{marginLeft: responsiveWidth(8)}}
            />
            <Text value={'Spanish'} style={{marginLeft: responsiveWidth(2)}} />
          </View> */}
          <Modal ModalContainer={styles.modalView} showModal={update}>
            <View style={styles.IconView}>
              <Image
                style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                source={require('../../images/button.png')}
              />
            </View>
            <Text style={styles.UpdatedText}>{'Updated'}</Text>
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
                fontFamily: normal,
              }}
              value={
                'A TYFT Account allows you to bookmark truck, review about them.'
              }
            />
          </View>
          <View style={{marginTop: responsiveHeight(10)}}>
            <Button
              onPress={() => {
                navigation.navigate(RouteName.HOME);
              }}
              style={styles.button1}>
              <Text style={{color: '#fff'}} value={'SIGN IN NOW'} />
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  TextViewStyle: {
    // width: responsiveWidth(60)
  },
  Input: {
    marginTop: responsiveHeight(5),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsiveWidth(24),
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
    height: responsiveHeight(20),
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
});
export default Account;
