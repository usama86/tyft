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
import {CommonActions} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
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
    setPhoto(photo);
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
              let userId = await AsyncStorage.getItem('userID');
              axios
                .post(url + '/api/users/updateprofileimage', {
                  _id: userId,
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
    // if (password.value !== confirmPassword.value) {
    //   setConfirmPassword({
    //     value: confirmPassword.value,
    //     errorText: 'Confirm Password Does not matched with current Password',
    //   });
    // } 
    else if (name.value && email.value  && phone.value) {
      await setisLoading(true);
      let userID = await AsyncStorage.getItem('userID');
      axios
        .post(url + '/api/users/updateuser', {
          _id: userID,
          email: email.value,
          // password: password.value,
          profileName: name.value,
          phoneNumber: phone.value,
          userType: 'Customer',
          Language: Language,
        })
        .then(async Response => {
          await AsyncStorage.setItem('language' + '', Language);
          let Code = Response.data.code;
          if (Code === 'ABT0000') {
            setisLoading(false);
            await AsyncStorage.setItem('userName' + '', name.value);   
      
            setUpdated(true);
            setTimeout(() => {
              setUpdated(false);
            }, 500);
             navigation.navigate('AccountInfo');
          } 
          else {
            setisLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
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
    <View style={{height: '100%', width: '100%'}}>
      {LoggedIn ? (
        <Header navigation={navigation} onPress={() => navigation.goBack()}>
          {'Update Account'}
        </Header>
      ) : (
        <Header navigation={navigation} onPress={() => navigation.goBack()}>
          {'Update Account'}
        </Header>
      )}

      {true ? (
        <Ui
          onPressButton={updateUser}
          isLoading={isLoading}         
          ButtonText={'Done'}
          TextShow={false}
          TextSpace={styles.TextSpace}
          TextViewStyle={styles.TextViewStyle}>
          <View style={styles.InputMainView}>
          <View style={styles.rowView}>
                <Avatar
                  source={img ? {uri: img.uri} : {uri: photo}}
                  // style={{marginLeft:2}}
                  icon={{name: 'user', type: 'font-awesome'}}
                  showEditButton
                  rounded
                  onPress={SelectImage}
                  size={responsiveFontSize(13)}
                />
                {/* imageProps={{uri:truckData.truckLogo}} */}
                {/* <View style={{marginLeft: 20}}>
                  <Text style={styles.whiteText1} bold value={name} />
                </View> */}
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
              placeholder="Email Address"
              keyboardType={'email-address'}
              value={email.value}
              onChangeText={e => changeEmail(e)}
              errorText={email.errorText ? email.errorText : null}
              style={styles.Input}
            />
            <Input
              rounded
              placeholder="Cell Phone"
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
                navigation.navigate(RouteName.HOME);
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
    marginLeft:responsiveWidth(24)
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
});
export default Account;
