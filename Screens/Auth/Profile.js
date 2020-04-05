import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import Container from '../../Component/Container';
import Button from '../../Component/Button';
import Text from '../../Component/Text';
import theme from '../theme';
import {SearchBar, Rating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as RouteName from '../../Constants/RouteName';
const Profile = ({navigation}) => {
  return (
    <Container>
      <View style={styles.HeaderContainer}>
        <Image style={styles.image} source={require('../../images/art.jpg')} />
      </View>
      <View style={styles.TabView}>
        <Button style={styles.Button}>
          <Text style={styles.Btntext} value={'Info'} />
        </Button>
        <Button onPress={()=>navigation.navigate(RouteName.MENU)} style={[styles.Button,{backgroundColor:'white'}]}>
          <Text style={[styles.Btntext,{color:'black'}]} value={'Menu'} />
        </Button>
        <Button onPress={()=>navigation.navigate(RouteName.MENU)}  style={[styles.Button,{backgroundColor:'white'}]}>
          <Text style={[styles.Btntext,{color:'black'}]} value={'Reviews'} />
        </Button>
      </View>

      <View style={styles.flexView}>
        <Text bold value={'Taco Truck'} />
        <Rating startingValue={3.5} imageSize={responsiveFontSize(2.8)} />
      </View>
      <View style={[styles.flexView, {marginTop: 0}]}>
        <Text
          style={{fontSize: responsiveFontSize(1.4)}}
          value={'American,Soul Food,Indian\n%25 US-75 Coney, KS 67333'}
        />
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
          marginRight: responsiveWidth(3),
          alignSelf: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <AntDesign
          style={{marginLeft: responsiveWidth(1)}}
          name={'clockcircleo'}
          color={'#212121'}
          size={responsiveFontSize(1.8)}
        />
        <Text
          style={{
            marginLeft: responsiveWidth(1),
            fontSize: responsiveFontSize(1.4),
          }}
          value={'11:00 AM - 2:00 PM'}
        />
      </View>
      <View
        style={{
          width: '85%',
          paddingVertical: responsiveHeight(5),
          marginLeft: responsiveWidth(3),
        }}>
        <Text
          value={
            'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
          }
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
          value={'contact@theveggiewhisperrers.com'}
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
          value={'http://wwww.theveggiewhisperrers.com'}
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
          value={'(303) 500-7921'}
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
    elevation:5
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
    justifyContent:'space-between'
  },
});

export default Profile;
