import React,{useEffect} from 'react';
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
import ImgToBase64 from 'react-native-image-base64';

const TruckLogo = ({navigation,route}) => {
  const [check, SetCheck] = React.useState(false);
  const [name, SetName] = React.useState('');
  const [TruckLogo, setImg] = React.useState(null)
  const changeInputHandler = () => {
    SetCheck(!check);
  };
  // useEffect(()=>{
  // console.log('params',route.params)
  // },[])
  const SendUri = async (val)=>{
    
    setImg(val)
    console.log(val);
    try
    {  
    let newFile = {
      uri : 'file://' + val.uri,
      type: `test/${val.type}`,
      name: `test.${val.fileName}`
}
    console.log(newFile);
    const data = new FormData()
    data.append('file', newFile)
    data.append('upload_preset', 'tyftBackend')
    data.append("cloud_name", "hmrzthc6f")
    fetch("https://api.cloudinary.com/v1_1/hmrzthc6f/image/upload", {
      method: "post",
      // headers: {
      //   //         'Accept': 'application/json',
      //   //         'Content-Type': 'multipart/form-data',
      //   //     },
      body: data
    }).then(res => res.json()).
      then(data => {
        console.log(data)
      }).catch(err => {
          console.log(err);
      })
 


    }
    catch(e)
    {
      console.log("error => ", e)
    }
   
    
    
    
    // console.log(val);
  }
  return (
    <View style={{height:'100%',width:'100%'}}>
    <Header  onPress={() => navigation.goBack()}>{'Truck Logo'}</Header>
    <Ui
      TextValue={"Your food's truck logo"}
      TextViewStyle={styles.UiText}
      ContentStyle={styles.ContentStyle}
      ButtonText={'Next'}
      onPressButton={() => navigation.navigate(RouteName.TRUCKINFO,{
        Name: route.params.Name,
        Email: route.params.Email,
        Phone: route.params.Phone,
        Password: route.params.Password,
        TruckLogo:TruckLogo

      })}>
      <View style={styles.InputMainView}>
        <Text
          value={
            'Upload a logo photo to help users quickly recognize your brand'
          }
          style={{color: 'grey', marginLeft:responsiveWidth(2.5)}}
        />
      </View>
      <ImagePicker text={'Upload your logo'}  SendUri={SendUri} style = {styles.ImageContainer} />
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
  ImageContainer:{
    width:responsiveWidth(80),
    height:responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default TruckLogo;
