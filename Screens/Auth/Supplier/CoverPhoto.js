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
import {Snackbar} from 'react-native-paper';
import ImageResizer from 'react-native-image-resizer';
const CoverPhoto = ({navigation, route}) => {
  const [img, setImg] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const [visible, setVisible] = React.useState({value: null, text: null});
  const onDismissSnackBar = () => {
    setVisible({value: null, text: null});
  };
  const SendUri = val => {
    setImg(val);
    try {
      setisLoading(true);
      ImageResizer.createResizedImage(val.uri, val.height, val.width, 'JPEG', 100)
      .then(async(responses) => {
        let getResponse = await responses;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data');
        myHeaders.append('Accept', 'application/json');
        // let file = await uriToBlob(val.uri)
        var formdata = new FormData();
        formdata.append('file', {
          uri: getResponse.uri,
          type: 'image/jpeg',
          name: val.fileName,
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
          .then(result => {
            setImageUrl(result.url);
            // setImg(val);
            setisLoading(false);
          })
          .catch(error => {
            console.log('error', error);
            // setIsLoading(false);
          });
      })  
    } catch (e) {
      console.log('error => ', e);
    }
  };
  const Navigate = async () => {
    if (img) {
      setisLoading(true);
      let data = {
        email: route.params.Email,
        password: route.params.Password,
        profileName: route.params.Name,
        truckLogo: route.params.TruckLogo,
        coverPhoto: imageUrl, //img
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
        categoryArray: route.params.categoryArray,
      };
      axios
        .post(
          url + '/api/users/signup',
          data,
        )
        .then(async Response => {
          let Code = Response.data.code;
          console.log('Response is here')
          if (Code === 'ABT0000') {
            setVisible({
              value: true,
              text:
                'Your TYFT Vendor account has been created successfully!You will not be able to login until TYFT team review your registration.\nYou will receive a confirmation email once everything is ready to go.Your TYFT Vendor account has been created successfully!You will not be able to login until TYFT team review your registration.\nYou will receive a confirmation email once everything is ready to go.',
            });
            setTimeout(() => {
              navigation.replace(RouteName.HOME);
              setisLoading(false);
            }, 3000);
          } else {
            setisLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Alert.alert('Please Select Cover Photo First');
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
      <Snackbar
          style={{top: responsiveHeight(-70)}}
          visible={visible.value}
          onDismiss={onDismissSnackBar}>
          {visible.text}
        </Snackbar>
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
