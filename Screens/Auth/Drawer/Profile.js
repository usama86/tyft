import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Input from '../../../Component/Input';
import Text from '../../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Checkbox from '../../../Component/Checkbox';
import Ui from '../../../Component/Ui';
import * as RouteName from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import ErrorView from '../../../Component/ErrorField';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from '../../../Component/Modal';
import {bold} from '../Constants/constants';
import {Language} from '../../../Constants/LanguageChangeFunc';
const TruckInfo = ({navigation, route}) => {
  const [check, SetCheck] = React.useState(false);
  const [loading, setLoading] = React.useState(null);
  const [update, setUpdated] = React.useState(null);
  const [truckName, SetTruckName] = React.useState({
    name: null,
    Error: false,
    ErrorText: null,
  });
  const [businessDesc, setBusinessDesc] = React.useState({
    description: null,
    Error: false,
    ErrorText: null,
  });
  const [contact, setContact] = React.useState({
    contact: null,
    Error: null,
    ErrorText: null,
  });
  const [email, setEmail] = React.useState({
    email: null,
    Error: null,
    ErrorText: null,
  });
  const [city, setCity] = React.useState({
    city: null,
    Error: null,
    ErrorText: null,
  });
  const [website, setWebsite] = React.useState({
    website: null,
    Error: null,
    ErrorText: null,
  });

  React.useEffect(() => {
    if (route.params.truckData) {
      SetTruckName({
        name: route.params.truckData[0].truckName,
        ErrorText: null,
        Error: null,
      });
      setBusinessDesc({
        description: route.params.truckData[0].businessDesc,
        ErrorText: null,
        Error: null,
      });
      setContact({
        contact: route.params.truckData[0].truckContact,
        ErrorText: null,
        Error: null,
      });
      setEmail({
        email: route.params.truckData[0].truckEmail,
        ErrorText: null,
        Error: null,
      });
      setCity({
        city: route.params.truckData[0].truckCity,
        ErrorText: null,
        Error: null,
      });
      setWebsite({
        website: route.params.truckData[0].truckWebsite,
        ErrorText: null,
        Error: null,
      });
    }
  }, []);

  const changeInputHandler = () => {
    SetCheck(!check);
  };
  const changeEmail = e => {
    let EmailRegix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (EmailRegix.test(e)) {
      setEmail({email: e, Error: false, ErrorText: null});
    } else if (e === '') {
      setEmail({email: e, Error: false, ErrorText: null});
    } else if (!EmailRegix.test(e)) {
      setEmail({email: e, Error: true, ErrorText: 'Please Enter Valid Email'});
    }
  };
  const Navigate = async () => {
    let TruckId = await AsyncStorage.getItem('TruckID');
    setLoading(true);
    axios
      .post(url + '/api/supplier/updatetruckinfo', {
        _id: TruckId,
        truckName: truckName.name.replace(/\s+$/, ''),
        businessDesc: businessDesc.description,
        truckContact: contact.contact,
        truckEmail: email.email,
        truckCity: city.city,
        truckWebsite: website.website,
      })
      .then(async Response => {
        console.log(Response);
        const ERROR = Response.data.code;
        if (ERROR === 'ABT0000') {
          console.log('Updated');
          setUpdated(true);
          setTimeout(() => {
            setLoading(false);
            setUpdated(false);
          }, 2000);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <Header isHome onPress={() => navigation.openDrawer()}>
        {'Truck Info'}
      </Header>

      <KeyboardAvoidingView
        style={{backgroundColor: '#fff'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={
          Platform.OS === 'android' && responsiveHeight(-32)
        }>
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="never">
          <Ui
            TextViewStyle={styles.TextViewStyle}
            TextValue={"Your food truck's info"}
            ButtonText={Language['Done']}
            isLoading={loading}
            ContentStyle={{height: null}}
            buttonStyle={{marginVertical: responsiveHeight(1)}}
            onPressButton={Navigate}>
            <View style={styles.InputMainView}>
              <Input
                rounded
                placeholder="Truck Name"
                onChangeText={e =>
                  SetTruckName({name: e, Error: false, ErrorText: null})
                }
                value={truckName.name}
                style={styles.Input}
              />
              {truckName.Error ? (
                <ErrorView>{truckName.ErrorText}</ErrorView>
              ) : null}
              <Input
                rounded
                placeholder="Business Description"
                multiline={true}
                value={businessDesc.description}
                onChangeText={e =>
                  setBusinessDesc({
                    description: e,
                    Error: false,
                    ErrorText: null,
                  })
                }
                style={{
                  height: responsiveHeight(19),
                  marginTop: responsiveHeight(2),
                  width: '100%',
                }}
              />
              {businessDesc.Error ? (
                <ErrorView>{businessDesc.ErrorText}</ErrorView>
              ) : null}
              <Input
                rounded
                placeholder="Contact"
                style={styles.Input}
                value={contact.contact}
                onChangeText={e =>
                  setContact({contact: e, Error: false, ErrorText: null})
                }
              />
              {contact.Error ? (
                <ErrorView>{contact.ErrorText}</ErrorView>
              ) : null}
              <Input
                rounded
                placeholder="Truck Email"
                onChangeText={e => changeEmail(e.trim())}
                value={email.email}
                style={styles.Input}
              />
              {email.Error ? <ErrorView>{email.ErrorText}</ErrorView> : null}
              <Input
                rounded
                placeholder="City"
                onChangeText={e =>
                  setCity({city: e, Error: false, ErrorText: null})
                }
                value={city.city}
                style={styles.Input}
              />
              {city.Error ? <ErrorView>{city.ErrorText}</ErrorView> : null}
              <Input
                rounded
                placeholder="Website"
                onChangeText={e =>
                  setWebsite({website: e, Error: false, ErrorText: null})
                }
                value={website.website}
                style={styles.Input}
              />
              {website.Error ? (
                <ErrorView>{website.ErrorText}</ErrorView>
              ) : null}
            </View>
            <Modal ModalContainer={styles.modalView} showModal={update}>
              <View style={styles.IconView}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                  source={require('../../../images/button.png')}
                />
              </View>
              <Text style={styles.UpdatedText} value={'Updated'} />
            </Modal>
          </Ui>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  Input: {
    marginTop: responsiveHeight(3),
  },
  TextViewStyle: {
    //  width: responsiveWidth(60),
  },
  radioView: {
    flexDirection: 'row',
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
  IconView: {
    width: '90%',
    alignSelf: 'center',
    height: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
  },
});
export default TruckInfo;
