import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import Container from './../../Component/Container';
import Text from '../../Component/Text';
import Button from '../../Component/Button';
import theme from './../theme';
import {SearchBar, Rating} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import {Switch} from 'react-native-switch';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as RouteName from '../../Constants/RouteName';
import Header from '../../Component/Header';
import Entypo from 'react-native-vector-icons/Entypo';
const CustomerSupplier = ({navigation, route}) => {
  const [ToggleSwitch, setToggleSwitch] = useState(false);
  const [favoriteSwitch,setFavoriteSwitch] = useState(false);
  useEffect(()=>{
      console.log('Params=>',route.params.TruckInfo)
  },[]);
  const setFavorite=()=>{
    setFavoriteSwitch(!favoriteSwitch);
    
  }
  return (
    <Container>
      <View style={styles.HeaderContainer}>
        <ImageBackground
          style={styles.image}
          source={require('../../images/art.jpg')}>
          <Header onPress={() => navigation.goBack()}>
            {route.params.TruckInfo.truckName}
          </Header>
        </ImageBackground>
      </View>
      <View style={styles.TabView}>
        <Button style={styles.Button}>
          <Text style={styles.Btntext} value={'Info'} />
        </Button>
        <Button
          onPress={() => navigation.navigate(RouteName.MENU,{Menu:route.params.TruckInfo.Menu})}
          style={[styles.Button, {backgroundColor: 'white'}]}>
          <Text style={[styles.Btntext, {color: 'black'}]} value={'Menu'} />
        </Button>
        <Button
          onPress={() => navigation.navigate(RouteName.CUSTOMERREVIEWS,{Menu:route.params.TruckInfo.Menu})}
          style={[styles.Button, {backgroundColor: 'white'}]}>
          <Text style={[styles.Btntext, {color: 'black'}]} value={'Reviews'} />
        </Button>
      </View>

      <View style={styles.flexView1}>
        <Text bold style={{color: 'blue'}} value={route.params.TruckInfo.truckName} /> 

      {favoriteSwitch 
        ?  
        <Entypo 
          style={{marginLeft: responsiveWidth(4),marginTop:responsiveHeight(0.7),color:'#B40E33'}}
          name={'heart'}
          // color={'#212121'}sadsd
          size={responsiveFontSize(3)}
          onPress={setFavorite}
        /> 
        :
        <Entypo 
          style={{marginLeft: responsiveWidth(4),marginTop:responsiveHeight(0.7),color:'#B40E33'}}
          name={'heart-outlined'}
          // color={'#212121'}sadsd
          size={responsiveFontSize(3)}
          onPress={setFavorite}
      />} 
      </View>
      <View style={[styles.flexView, {marginTop: 0}]}>
        {route.params.TruckInfo.rating ? (
          <Rating
            readonly
            startingValue={route.params.TruckInfo.rating}
            imageSize={responsiveFontSize(2.8)}
          />
        ) : 
        <Rating
            readonly
            startingValue={0}
            imageSize={responsiveFontSize(2.8)}
          />
        }
      </View>
      <View
          style={{
            flexDirection: 'row',
            width: '30%',
            justifyContent: 'space-between',
            marginLeft:responsiveWidth(3)
          }}>
          <Text
            style={{
              color: 'green',
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2),
            }}
            value={'OPEN'}
          />
        </View>
      <View
        style={{
          width: '85%',
          paddingVertical: responsiveHeight(5),
          marginLeft: responsiveWidth(3),
        }}>
        <Text
        value={route.params.TruckInfo.businessDesc}
        />
      </View>
      <View style={styles.iconView}>
        <AntDesign
          style={{marginLeft: responsiveWidth(1), width: '20%'}}
          name={'mail'}
          color={'#212121'}
          size={responsiveFontSize(2.5)}
        />
        <Text
          style={{
            fontSize: responsiveFontSize(1.8),
            color: '#212121',
          }}
          value={route.params.TruckInfo.truckEmail}
        />
      </View>
      <View style={styles.iconView}>
        <Foundation
          style={{marginLeft: responsiveWidth(1), width: '20%'}}
          name={'shield'}
          color={'#212121'}
          size={responsiveFontSize(2.5)}
        />
        <Text
          style={{
            fontSize: responsiveFontSize(1.8),
            color: '#212121',
          }}
          value={route.params.TruckInfo.truckWebsite}
        />
      </View>
      <View style={styles.iconView}>
        <AntDesign
          style={{marginLeft: responsiveWidth(1), width: '20%'}}
          name={'phone'}
          color={'#212121'}
          size={responsiveFontSize(2.5)}
        />
        <Text
          style={{
            fontSize: responsiveFontSize(1.8),
            color: '#212121',
          }}
          value={route.params.TruckInfo.truckContact}
        />
      </View>
      <View style={styles.SocialIcons}>
        <AntDesign
          name={'twitter'}
          color={'#212121'}
          size={responsiveFontSize(2.5)}
        />
        <AntDesign
          name={'instagram'}
          color={'#212121'}
          size={responsiveFontSize(2.5)}
        />
        <AntDesign
          name={'facebook-square'}
          color={'#212121'}
          size={responsiveFontSize(2.5)}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    height: responsiveHeight(25),
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  TabView: {
    height: responsiveHeight(7),
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: responsiveHeight(21),
  },
  Button: {
    width: '30%',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5,
  },
  Btntext: {
    color: 'white',
  },
  flexView: {
    marginTop: responsiveHeight(5),
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexView1: {
    marginTop: responsiveHeight(5),
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconView: {
    marginVertical: responsiveHeight(1),
    width: '80%',
    flexDirection: 'row',
    marginLeft: responsiveWidth(3),
    alignItems: 'center',
  },
  SocialIcons: {
    height: responsiveHeight(15),
    width: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CustomerSupplier;
