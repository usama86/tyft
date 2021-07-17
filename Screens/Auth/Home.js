import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text as Text1,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Text from './../../Component/Text';
import Button from '../../Component/Button';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconss from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import * as RouteName from '../../Constants/RouteName';
import Animation from './../../Component/Animation';
import Container from './../../Component/Container';
import axios from 'axios';
import url, {bold} from '../Auth/Constants/constants';
import {CheckBox} from 'native-base';
import Radio from './../../Component/Radio';
import AsyncStorage from '@react-native-community/async-storage';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import theme from '../theme';
//Langauge
import {LanguageSelect, Language} from '../../Constants/LanguageChangeFunc';
import English from '../../Constants/en.json';
import Spanish from '../../Constants/sp.json';
const Home = ({navigation}) => {
  const {
    container,
    logoStyle,
    TextStyle,
    buttonStyle,
    buttonStyle1,
    buttonStyle2,
    ButtonViewStyle,
    FooterText,
    Underline,
    logoStyle1,
    TouchStyle,
  } = styles;
  const [language, setLanguage] = useState('English');
  useEffect(() => {
    navigation.addListener('focus', () => {
      LanguageSelect(English);
    });
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '374587781671-8ek6scsp51ihfjjt21378bkngu1g73gv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  });

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      console.log('User INFO', result);

      axios
        .post(url + '/api/users/getuser', {
          email: result.user.email,
        })
        .then(async res => {
          if (res.data.length > 0) {
            await AsyncStorage.setItem('userID' + '', res.data[0]._id);
            await AsyncStorage.setItem('userType' + '', res.data[0].userType);
            await AsyncStorage.setItem(
              'userName' + '',
              res.data[0].profileName,
            );
            await AsyncStorage.setItem('email' + '', res.data[0].email);
            await AsyncStorage.setItem(
              'profileName' + '',
              res.data[0].profileName,
            );
            await AsyncStorage.setItem(
              'phoneNumber' + '',
              res.data[0].phoneNumber,
            );
            if (res.data[0].userType === 'Customer')
              navigation.navigate('Auth', {screen: 'Tabs'});
            else navigation.navigate('App', {screen: RouteName.VEGGIEWISPER});
          } else {
            axios
              .post(url + '/api/users/signup', {
                email: result.user.email,
                password: '',
                profileName: result.user.name,
                phoneNumber: '',
                userType: 'Customer',
                Language: 'English',
                social: true,
              })
              .then(async Response => {
                console.log('Responsessss', Response.data.code);
                let Code = Response.data.code;
                if (Code === 'ABT0000') {
                  // setisLoading(false);
                  console.log('Customer Added');

                  axios
                    .post(url + '/api/users/getuser', {
                      email: result.user.email,
                    })
                    .then(async res => {
                      if (res.data.length > 0) {
                        await AsyncStorage.setItem(
                          'userID' + '',
                          res.data[0]._id,
                        );
                        await AsyncStorage.setItem(
                          'userType' + '',
                          res.data[0].userType,
                        );
                        await AsyncStorage.setItem(
                          'userName' + '',
                          res.data[0].profileName,
                        );
                        await AsyncStorage.setItem(
                          'email' + '',
                          res.data[0].email,
                        );
                        await AsyncStorage.setItem(
                          'profileName' + '',
                          res.data[0].profileName,
                        );
                        await AsyncStorage.setItem(
                          'phoneNumber' + '',
                          res.data[0].phoneNumber,
                        );
                        navigation.navigate('Auth', {screen: 'Tabs'});
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                } else {
                  console.log('NOT ADDEED');
                  // setisLoading(false);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('User', error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('User', error);
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const LoginWithFb = async () => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function(result) {
        if (result.isCancelled) {
          // alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            let accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error);
              } else {
                console.log(result);
                //  navigation.navigate('Auth', {screen: 'Tabs'});

                axios
                  .post(url + '/api/users/getuser', {
                    email: result.email,
                  })
                  .then(async res => {
                    if (res.data.length > 0) {
                      await AsyncStorage.setItem(
                        'userID' + '',
                        res.data[0]._id,
                      );
                      await AsyncStorage.setItem(
                        'userType' + '',
                        res.data[0].userType,
                      );
                      await AsyncStorage.setItem(
                        'userName' + '',
                        res.data[0].profileName,
                      );
                      await AsyncStorage.setItem(
                        'email' + '',
                        res.data[0].email,
                      );
                      await AsyncStorage.setItem(
                        'profileName' + '',
                        res.data[0].profileName,
                      );
                      await AsyncStorage.setItem(
                        'phoneNumber' + '',
                        res.data[0].phoneNumber,
                      );
                      navigation.navigate('Auth', {screen: 'Tabs'});
                    } else {
                      axios
                        .post(url + '/api/users/signup', {
                          email: result.email,
                          password: '',
                          profileName: result.first_name + result.last_name,
                          phoneNumber: '',
                          userType: 'Customer',
                          Language: 'English',
                          social: true,
                        })
                        .then(async Response => {
                          console.log('Responsessss', Response.data.code);
                          let Code = Response.data.code;
                          if (Code === 'ABT0000') {
                            // setisLoading(false);
                            console.log('Customer Added');

                            axios
                              .post(url + '/api/users/getuser', {
                                email: result.email,
                              })
                              .then(async res => {
                                if (res.data.length > 0) {
                                  await AsyncStorage.setItem(
                                    'userID' + '',
                                    res.data[0]._id,
                                  );
                                  await AsyncStorage.setItem(
                                    'userType' + '',
                                    res.data[0].userType,
                                  );
                                  await AsyncStorage.setItem(
                                    'userName' + '',
                                    res.data[0].profileName,
                                  );
                                  await AsyncStorage.setItem(
                                    'email' + '',
                                    res.data[0].email,
                                  );
                                  await AsyncStorage.setItem(
                                    'profileName' + '',
                                    res.data[0].profileName,
                                  );
                                  await AsyncStorage.setItem(
                                    'phoneNumber' + '',
                                    res.data[0].phoneNumber,
                                  );
                                  navigation.navigate('Auth', {screen: 'Tabs'});
                                }
                              })
                              .catch(error => {
                                console.log(error);
                              });
                          } else {
                            console.log('NOT ADDEED');
                            // setisLoading(false);
                          }
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            };
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name',
                  },
                },
              },
              responseInfoCallback,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function(error) {
        alert('Login fail with error: ' + error);
      },
    );
  };
  return (
    //    <Animation>
    <Container>
      <View style={container}>
        <Image
          style={logoStyle}
          source={require('./../../images/TYFTLogo.png')}
        />
        <Text style={TextStyle} numberOfLines={1} value={'S I G N U P'} />
      </View>

      <View style={ButtonViewStyle}>
        <Button onPress={LoginWithFb} style={buttonStyle} rounded>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="sc-facebook" size={30} color="white" />
            <Text
              uppercase={false}
              value={'With Facebook'}
              style={{color: 'white', marginLeft: responsiveWidth(3)}}
            />
          </View>
          <Entypo name="chevron-thin-right" size={15} color="white" />
        </Button>

        <Button onPress={signInGoogle} style={buttonStyle1} rounded>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Iconss name="google" size={25} color="white" />
            <Text
              uppercase={false}
              value={'With Google'}
              style={{color: 'white', marginLeft: responsiveWidth(5)}}
            />
          </View>
          <Entypo name="chevron-thin-right" size={15} color="white" />
        </Button>

        <Button
          style={buttonStyle2}
          rounded
          onPress={() => {
            navigation.navigate(RouteName.SIGNUPSELECTION);
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={logoStyle1}
              source={require('./../../images/TYFTLogo.png')}
            />
            <Text
              uppercase={false}
              style={{marginLeft: responsiveWidth(5)}}
              value={'New Account'}
            />
          </View>
          <Entypo name="chevron-thin-right" size={15} color="rgb(0, 0, 0)" />
        </Button>
      </View>
      <View
        style={{
          marginTop: responsiveHeight(3),
          width: '50%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            setLanguage('English');
            LanguageSelect(English);
          }}
          style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Radio
            style={{width: responsiveWidth(5.4), height: responsiveHeight(3.4)}}
            // color={theme.colors.primary}
            selected={language === 'English'}
            onPress={() => {
              setLanguage('English');
              LanguageSelect(English);
            }}
          />
          <Text1
            style={{
              marginTop: responsiveHeight(0.3),
              marginLeft: responsiveWidth(3),
            }}>
            {'English'}
          </Text1>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLanguage('Spanish');
            LanguageSelect(Spanish);
          }}
          style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Radio
            style={{width: responsiveWidth(5.4), height: responsiveHeight(3.4)}}
            // color={theme.colors.primary}
            selected={language === 'Spanish'}
            onPress={() => {
              setLanguage('Spanish');
              LanguageSelect(Spanish);
            }}
          />
          <Text1
            style={{
              marginTop: responsiveHeight(0.3),
              marginLeft: responsiveWidth(3),
            }}>
            {'Spanish'}
          </Text1>
        </TouchableOpacity>
      </View>

      <View style={FooterText}>
        <View style={{flexDirection: 'row', marginBottom: responsiveHeight(5)}}>
          <Text value={Language['hi']} />
          <Text
            style={Underline}
            onPress={() => {
              navigation.navigate(RouteName.SIGNIN);
            }}
            value={'Log in'}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteName.TABS)}
          style={TouchStyle}>
          <Text style={Underline} value={'Sign In Later'} />
        </TouchableOpacity>
      </View>
    </Container>
    // </Animation>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(10),
    width: '100%',
    height: responsiveHeight(22),
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: responsiveWidth(32),
  },
  logoStyle: {
    height: responsiveHeight(20),
    width: responsiveWidth(40),
    resizeMode: 'contain',
  },
  logoStyle1: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
    resizeMode: 'contain',
  },
  TextStyle: {
    width: responsiveWidth(40),
    color: 'rgb(193, 32, 38)',
    fontSize: responsiveFontSize(2.4),
    marginLeft: responsiveWidth(17),
  },
  TouchStyle: {
    marginRight: responsiveWidth(3),
  },
  buttonStyle: {
    backgroundColor: '#3b589c',
    width: responsiveWidth(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  buttonStyle1: {
    marginTop: responsiveHeight(5),
    backgroundColor: 'rgb(234, 66, 53)',
    width: responsiveWidth(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  buttonStyle2: {
    marginTop: responsiveHeight(5),
    backgroundColor: 'white',
    width: responsiveWidth(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: responsiveWidth(5),
    paddingLeft: responsiveWidth(4),
    // paddingHorizontal:responsiveWidth(5),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(0, 0, 0)',
  },
  ButtonViewStyle: {
    marginTop: responsiveHeight(5),
    marginHorizontal: responsiveWidth(18),
  },
  FooterText: {
    alignItems: 'center',
    marginTop: responsiveHeight(3),
  },
  Underline: {
    textDecorationLine: 'underline',
    fontFamily: bold,
    marginLeft: responsiveWidth(1),
  },
});

export default Home;
