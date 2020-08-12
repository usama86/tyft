import React from 'react';
import {View, StyleSheet,Alert,alert} from 'react-native';
import Input from '../../../Component/Input';
import Text from '../../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Checkbox from '../../../Component/Checkbox';
import Ui from '../../../Component/Ui';
import * as RouteName from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import ErrorView from '../../../Component/ErrorField';
import AsyncStorage from '@react-native-community/async-storage';
import url from '../Constants/constants';
import axios from 'axios';
const MenuSetting = ({navigation, route}) => {
  const [facebook, setFacebook] = React.useState('');
  const [instagram, setInstagram] = React.useState('');
  const [twitter, setTwitter] = React.useState('');

  React.useEffect(() => {
    getSocialMedia();
  }, []);

  const [Data, setData] = React.useState([]);
  
  const getSocialMedia = async () => {
    let TruckId = await AsyncStorage.getItem('TruckID');
    axios
      .post(url + '/api/supplier/getsocialmedia', {
        _id: TruckId,
      })
      .then(async Response => {
        let ERROR = Response.code;
        let Trucks = Response;
        if (ERROR !== 'ABT0001') {
          setFacebook(Response.data.facebook)
          setInstagram(Response.data.instagram)
          setTwitter(Response.data.twitter)
          // let filtered = Trucks.filter(item => item.status === 'Open');
          // setDatas(filtered);
        }
      }) 
      .catch(error => {
        console.log(error);
      });
  };

  const onSaveSocialMedia=async()=>{
    let TruckId = await AsyncStorage.getItem('TruckID');

    let socialMedia={
      facebook:facebook,
      instagram:instagram,
      twitter:twitter
    }
    axios
      .post(url + '/api/supplier/updatesocialmedia', {
        _id: TruckId,
        socialMedia:socialMedia
      })
      .then(async Response => {
        let ERROR = Response.code;
        let Trucks = Response;
        if (ERROR !== 'ABT0001') {
          Alert.alert('Updated Social Media');
        }
      }) 
      .catch(error => {
        console.log(error);
      });
  }

  return ( 
    <View style={{height: '100%', width: '100%'}}>
      <Header isHome  onPress={() => navigation.openDrawer()}>{'Social Media'}</Header>
      <Ui
        TextValue={'Social Media Details'}
        ButtonText={'Save'}
        onPressButton={onSaveSocialMedia}
     >
        <View style={styles.InputMainView}>
          <View style={styles.Time}>
            <Input
              rounded
              placeholder="Facebook"
              value={facebook}
              onChangeText={e =>
                setFacebook(e)
              }
              style={styles.Input}
            />
            {/* {facebook.Error ? (
              <ErrorView>{facebook.ErrorText}</ErrorView>
            ) : null} */}
            <Input
              rounded
              placeholder="Instagram"
              value={instagram}
              onChangeText={e =>
                setInstagram(e)
              }
              style={styles.Input}
            />
            {/* {instagram.Error ? (
              <ErrorView>{instagram.ErrorText}</ErrorView>
            ) : null} */}
            <Input
              rounded
              placeholder="Twitter"
              value={twitter}
              onChangeText={e =>
                setTwitter(e)
              }
              style={styles.Input}
            />
            {/* {twitter.Error ? <ErrorView>{twitter.ErrorText}</ErrorView> : null} */}
          </View>
        </View>
      </Ui>
    </View>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  Input: {
    marginTop: responsiveHeight(3),
  },

  TextView: {
    width: '90%',
    marginLeft: responsiveWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  radioView: {
    flexDirection: 'row',
  },
  Time: {
    height: responsiveHeight(20),
  },
});
export default MenuSetting;
