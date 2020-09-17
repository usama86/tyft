import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Text from '../../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Ui from '../../../Component/Ui';
import theme from './../../theme';

import * as RouteName from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import {Snackbar} from 'react-native-paper';
import axios from 'axios';
const ServingCusine = ({navigation, route}) => {
  const [isLoading, setisLoading] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const [Data, setData] = React.useState([]);

  const [indicator, setIndicator] = useState(true);

  React.useEffect(() => {
    getCusine();
  }, []);
  const getCusine = async () => {
    axios
      .get(url + '/api/servingcusine/getcusines')
      .then(async Response => {
        if (Response) {
      
          if (Response.data.length > 0) {
            let res = Response.data[0].cusine;
            setData(res);
         
          }
          // let newArr = [{...res.Supplier[0], TruckInfo: res.TruckInfo}];
          // setUserInfo(newArr);
          // setTruckInfo(res.TruckInfo[0]);
          setIndicator(false);
          // await AsyncStorage.setItem('TruckID'+'',res.TruckInfo[0]._id);
          // await AsyncStorage.setItem('MenuID'+'',res.TruckInfo[0].MenuID);
        } else {
          setIndicator(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const Checked = index => {
    let newArr = [...Data];
    newArr[index].checked = !newArr[index].checked;
    setData(newArr);
  };
  const PrintCard = (item, index) => (
    <TouchableOpacity
      onPress={() => Checked(index)}
      activeOpacity={0.8}
      style={[
        styles.MainView,
        item.checked
          ? {backgroundColor: theme.colors.primary, borderWidth: 0}
          : null,
      ]}>
      <Text
        style={[item.checked ? {color: 'white'} : null]}
        value={item.cusineName}
      />
    </TouchableOpacity>
  );

  const Navigate = () => {
    let newArray = Data.filter(item => item.checked);
    setisLoading(true);
    if (newArray.length === 0) {
      setVisible(true);
      setisLoading(false);
    } else if (newArray.length > 0) {
      setisLoading(false);
      navigation.navigate(RouteName.MENUSETTING, {
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
        FacebookID: route.params.FacebookID,
        InstagramID: route.params.InstagramID,
        TwitterID: route.params.TwitterID,
        ServingCusine: newArray,
      });
    }
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Serving Cusine'}</Header>
      {indicator ? (
        <ActivityIndicator
          size={'large'}
          style={{
            marginTop: responsiveHeight(25),
            marginLeft: responsiveWidth(0),
          }}
        />
      ) : (
        <Ui
          isLoading={isLoading}
          ContentStyle={styles.HeadingContainer}
          // TextViewStyle={styles.TextViewStyle}
          // TextValue={"Serving Cusine"}
          ContainerStyle={{marginTop: responsiveHeight(2)}}
          TextShow={false}
          ButtonText={'Next'}
          onPressButton={Navigate}
          buttonStyle={{
            marginLeft: responsiveWidth(-2.5),
            marginTop: responsiveHeight(0),
          }}>
          <FlatList
            data={Data}
            numColumns={3}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingVertical: responsiveHeight(0),
            }}
            renderItem={({item, index}) => PrintCard(item, index)}
          />
        </Ui>
      )}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}>
        Please Select Serving Cusine
      </Snackbar>
    </View>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  TextViewStyle: {
    //  width: responsiveWidth(60),
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  HeadingContainer: {
    height: responsiveHeight(75),
    marginLeft: responsiveWidth(-10),
    marginBottom: responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainView: {
    marginTop: responsiveHeight(2.2),
    width: responsiveWidth(25),
    height: responsiveHeight(6),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderColor: '#212121',
    borderWidth: 1,
    marginLeft: '6.25%',
    backgroundColor: '#fff',
  },
});
export default ServingCusine;
