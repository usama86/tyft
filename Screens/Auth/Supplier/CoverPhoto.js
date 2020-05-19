import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Input from '../../../Component/Input';
import Text from '../../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Checkbox from '../../../Component/Checkbox';
import Ui from '../../../Component/Ui';
import * as RouteName from './../../../Constants/RouteName';
import ImagePicker from '../../../Component/ImagePicker';
import Header from '../../../Component/Header';
import url from '../Constants/constants';
import axios from 'axios';
const CoverPhoto = ({navigation, route}) => {
  const [img, setImg] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(false);
  const SendUri = val => {
    setImg(val);
  };
  const Navigate = async() => {
    if (img) {
      setisLoading(true);
      const dataa = new FormData();
      dataa.append('file', img)
      dataa.append('upload_preset', 'tyftBackend')
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/hmrzthc6f/images/uploads',
        {
          method:'POST',
          body: dataa
        }
      )
      let data = {
        email: route.params.Email,
        password: route.params.Password,
        profileName: route.params.Name,
        // truckLogo: route.params.TruckLogo,
        // coverPhoto: img, //img
        phoneNumber: route.params.Phone,
        userType: 'Supplier',
        truckName: route.params.TruckName,
        businessDesc: route.params.BusinessDescription,
        truckContact: route.params.TruckContact,
        truckEmail: route.params.TruckEmail,
        truckCity: route.params.City,
        truckWebsite: route.params.Website,
        schedule: route.params.Schedule,
        facebook: route.params.FacebookID,
        instagram: route.params.InstagramID,
        twitter: route.params.TwitterID,
        selectedServingCusines: route.params.ServingCusine,
        Menu: route.params.Menu,
      };
      axios
        .post(
          url + '/api/users/signup',
          // {
          //   headers: {
          //     'Content-Type': 'multipart/form-data',
          //   },
          // }, 
          data,
        )
        .then(async Response => {
          let Code = Response.data.code;
          console.log('Response', Code);
          if (Code === 'ABT0000') {
            setisLoading(false);
            console.log('Customer Added');
            navigation.navigate(RouteName.HOME);
          } else {
            console.log('NOT ADDEED');
            setisLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    else{
      Alert.alert('Please Select Cover Photo First')
    }
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Truck Cover'}</Header>
      <Ui
        isLoading={isLoading}
        TextValue={'Upload the best angle of your food truck here'}
        TextViewStyle={styles.UiText}
        ContentStyle={styles.ContentStyle}
        ButtonText={'Complete Registration'}
        onPressButton={Navigate}>
        <View style={styles.InputMainView}>
          <Text
            value={
              'Upload a logo photo to help users quickly recognize your brand'
            }
            style={{color: 'grey'}}
          />
        </View>
        <ImagePicker
          text={'Add Cover Photo'}
          SendUri={SendUri}
          style={styles.ImageContainer}
        />
      </Ui>
    </View>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(8),
  },
  ContentStyle: {
    // height:responsiveHeight(65)
  },
  UiText: {
    width: responsiveWidth(70),
  },
  Input: {
    marginTop: responsiveHeight(3),
  },
  radioView: {
    flexDirection: 'row',
  },
  ImageContainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CoverPhoto;
