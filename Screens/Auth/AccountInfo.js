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
import {Avatar, Icon, ListItem} from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import { cos } from 'react-native-reanimated';
const AccountInfo = ({navigation}) => {
  const [name, SetName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
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
  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: Route.HOME },
        ],
      })
    );
  };
  const checkUserStatus = async () => {
    let userType = await AsyncStorage.getItem('userType');
    if (userType !== null) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  };

  useEffect(() => {
    checkUserStatus();
    getData();
   
  }, []);
  
  const getData=async()=>{
    let id   = await AsyncStorage.getItem('userID');
    let name = await AsyncStorage.getItem('userName');
    let emails = await AsyncStorage.getItem('email');
    //  await AsyncStorage.setItem('profileName' + '', usertoken.profileName);
    let phones = await AsyncStorage.getItem('phoneNumber');    
    console.log(id);
    console.log(name);
    console.log(emails);
    console.log(phones);

    SetName(name);
    setEmail(emails);
    setPhone(phones);
  }
  return (
    <View style={{height: '100%', width: '100%'}}>
      {LoggedIn ? (
        <Header
          logout
          Logout={Logout}
          navigation={navigation}
          onPress={() => navigation.goBack()}>
          {'Account'}
        </Header>
      ) : (
        <Header navigation={navigation} onPress={() => navigation.goBack()}>
          {'Account'}
        </Header>
      )}

      {LoggedIn ? (
        <Ui
          onPressButton={()=>{ navigation.navigate('Account')}}
          isLoading={isLoading}
          ContainerStyle={styles.ContainerStyle}
          TextShow
          ButtonText={'Edit Profile'}
          TextSpace={styles.TextSpace}
          TextViewStyle={styles.TextViewStyle}
          >
          <View style={styles.InputMainView}>
         
            <View style={styles.header}>
            <View style={styles.rowView}>
                <Avatar rounded size={responsiveFontSize(13)} />  
                {/* imageProps={{uri:truckData.truckLogo}} */}
                <View style={{marginLeft: 20}}>
                <Text style={styles.whiteText} bold value={name}/>
                </View>
            </View>
            </View>
            
            <View style={{
                width:'370%',
                backgroundColor:'#e4e6eb',
                height:responsiveHeight(0.2),
                marginLeft:responsiveWidth(-36.2),
                marginTop:responsiveHeight(4)
            }}
                
                />
              <View style={{marginLeft:responsiveWidth(-21),marginTop:responsiveHeight(3)}}>  
                <Text value={'Personal Details'} style={{color:'#B40E33'}} bold /> 
               
                <Text value={email} style={{color:'black',fontSize:responsiveFontSize(1.8),marginTop:responsiveHeight(2)}}/>
                <Text value={phone} style={{color:'black',fontSize:responsiveFontSize(1.8),marginTop:responsiveHeight(1)}}/>
              </View>
        
          </View>

        
        </Ui>
      ) : (
        <View style={{flex: 1, alignItems: 'center',marginTop:responsiveHeight(10)}}>
          <Image
            resizeMode={'contain'}
            style={{width: '40%', height: '40%'}}
            source={require('../../images/2.jpg')}
          />
          <View style={{width:responsiveWidth(82),marginLeft:responsiveWidth(14)}}>
         <Text style={{color: '#696969',fontSize:responsiveFontSize(2),fontWeight:'bold'}} value={'A TYFT Account allows you to bookmark truck, review about them and make'} />
         <Text style={{color: '#696969',fontSize:responsiveFontSize(2),fontWeight:'bold',marginLeft:responsiveWidth(22)}} value={'payment faster'}/>
         </View>
          <View style={{marginTop: responsiveHeight(10)}}>
            <Button
              onPress={() => {
                navigation.navigate('Home');
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
    marginVertical: responsiveHeight(0),
    
  },
  TextViewStyle: {
    // width: responsiveWidth(60)
  },
  Input: {
    marginTop: responsiveHeight(3),
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
  header: {
    backgroundColor: 'white',
    paddingTop: 20,
    marginLeft:responsiveWidth(-23),
    paddingBottom: 20,
    width:responsiveWidth(50)
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  ContainerStyle:{
    //   backgroundColor:'red',
      marginTop:responsiveHeight(3)
  }
});
export default AccountInfo;
