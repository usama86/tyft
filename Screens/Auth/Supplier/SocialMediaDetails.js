import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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
const MenuSetting = ({navigation, route}) => {
  const [facebook, setFacebook] = React.useState({
    id: null,
    Error: null,
    ErrorText: null,
  });
  const [instagram, setInstagram] = React.useState({
    id: null,
    Error: null,
    ErrorText: null,
  });
  const [twitter, setTwitter] = React.useState({
    id: null,
    Error: null,
    ErrorText: null,
  });
  useEffect(() => {
    console.log(
      'DATSAAAAAAAAAAAAAAAAAA=???',
      route.params.Schedule,
      route.params.Name,
      route.params.Email,
      route.params.Phone,
      route.params.Password,
      route.params.TruckName,
      route.params.BusinessDescription,
      route.params.TruckContact,
      route.params.TruckEmail,
      route.params.City,
      route.params.Website,
    );
  }, []);
  const Navigate = () => {
    if (!facebook.id) {
      setFacebook({
        id: "Not Specified",
        // Error: true,
        // ErrorText: 'Facebook account id is required.',
      });
    }
    if (!instagram.id) {
      setInstagram({
        id: "Not Specified",
        // Error: true,
        // ErrorText: 'Instagram account id is required.',
      });
    }
    if (!twitter.id) {
      setTwitter({
        id: "Not Specified",
        // Error: true,
        // ErrorText: 'Twitter account id is required.',
      });
    } 

      navigation.navigate(RouteName.SERVINGCUSINE, {
        Schedule: route.params.Schedule,
        Name: route.params.Name,
        Email: route.params.Email,
        Phone: route.params.Phone,
        Password: route.params.Password,
        TruckLogo: route.params.TruckLogo,
        TruckName: route.params.TruckName,
        BusinessDescription: route.params.BusinessDescription,
        TruckContact: route.params.TruckContact,
        TruckEmail: route.params.TruckEmail,
        City: route.params.City,
        Website: route.params.Website,
        FacebookID:facebook.id,
        InstagramID:instagram.id,
        TwitterID:twitter.id
      });
    
  };
  return ( 
    <View style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Social Media'}</Header>
      <Ui
        TextViewStyle={styles.TextViewStyle} 
        TextValue={'Social Media Details'}
        ButtonText={'Next'}
        onPressButton={Navigate}>
        <View style={styles.InputMainView}>
          <View style={styles.Time}>
            <Input
              rounded
              placeholder="Facebook"
              value={facebook.id}
              onChangeText={e =>
                setFacebook({id: e, Error: false, ErrorText: null})
              }
              style={styles.Input}
            />
            {facebook.Error ? (
              <ErrorView>{facebook.ErrorText}</ErrorView>
            ) : null}
            <Input
              rounded
              placeholder="Instagram"
              value={instagram.id}
              onChangeText={e =>
                setInstagram({id: e, Error: false, ErrorText: null})
              }
              style={styles.Input}
            />
            {instagram.Error ? (
              <ErrorView>{instagram.ErrorText}</ErrorView>
            ) : null}
            <Input
              rounded
              placeholder="Twitter"
              value={twitter.id}
              onChangeText={e =>
                setTwitter({id: e, Error: false, ErrorText: null})
              }
              style={styles.Input}
            />
            {twitter.Error ? <ErrorView>{twitter.ErrorText}</ErrorView> : null}
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
  TextViewStyle: {
    //  width: responsiveWidth(60),
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
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
