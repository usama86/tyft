import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
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
// import ImgToBase64 from 'react-native-image-base64';
import RNFetchBlob from 'rn-fetch-blob';
const TruckLogo = ({navigation, route}) => {
  const [check, SetCheck] = React.useState(false);
  const [name, SetName] = React.useState('');
  const [TruckLogo, setImg] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const changeInputHandler = () => {
    SetCheck(!check);
  };
  const SendUri = async val => {
    setImg(val);
    try {
      setIsLoading(true);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');
      myHeaders.append('Accept', 'application/json');
      // let file = await uriToBlob(val.uri)
      var formdata = new FormData();
      formdata.append('file', {
        uri: val.uri,
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
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
        });
    } catch (e) {
      console.log('error => ', e);
    }
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Truck Logo'}</Header>
      <Ui
        TextValue={"Your food's truck logo"}
        TextViewStyle={styles.UiText}
        ContentStyle={styles.ContentStyle}
        ButtonText={'Next'}
        isLoading={isLoading}
        onPressButton={() =>
          navigation.navigate(RouteName.TRUCKINFO, {
            Name: route.params.Name,
            Email: route.params.Email,
            Phone: route.params.Phone,
            Password: route.params.Password,
            TruckLogo: imageUrl,
          })
        }>
        <View style={styles.InputMainView}>
          <Text
            value={
              'Upload a logo photo to help users quickly recognize your brand'
            }
            style={{color: 'grey', marginLeft: responsiveWidth(2.5)}}
          />
        </View>
        {false ? (
          <ActivityIndicator
            size={'large'}
            style={{
              marginTop: responsiveHeight(25),
              marginLeft: responsiveWidth(0),
            }}
          />
        ) : (
          <ImagePicker
            text={'Upload your logo'}
            SendUri={SendUri}
            style={styles.ImageContainer}
          />
        )}
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
export default TruckLogo;
