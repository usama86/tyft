import React from 'react';
import {View, Image, StyleSheet,TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Text from './../../Component/Text';
import Button from '../../Component/Button';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconss from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import * as RouteName from '../../Constants/RouteName';
import Animation from './../../Component/Animation';
import Container from './../../Component/Container';

const Home = ({navigation}) => {
  const {
    container,
    logoStyle,
    TextStyle,
    buttonStyle,
    buttonStyle1,
    buttonStyle2,
    ButtonViewStyle,
    FooterText,
    Underline,
    logoStyle1,
    TouchStyle
  } = styles;
  return (
    //    <Animation>
    <Container>
      <View style={container}>
        <Image
          style={logoStyle}
          source={require('./../../images/TYFTLogo.png')}
        />
        <Text style={TextStyle} bold numberOfLines={1} value={'S I G N U P'} />
      </View>

      <View style={ButtonViewStyle}>
        <Button style={buttonStyle} rounded>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="sc-facebook" size={30} color="white" />
            <Text
              uppercase={false}
              value={'With Facebook'}
              style={{color: 'white', marginLeft: responsiveWidth(3)}}
            />
          </View>
          <Entypo name="chevron-thin-right" size={15} color="white" />
        </Button>

        <Button style={buttonStyle1} rounded>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Iconss name="google" size={25} color="white" />
            <Text
              uppercase={false}
              value={'With Google'}
              style={{color: 'white', marginLeft: responsiveWidth(5)}}
            />
          </View>
          <Entypo name="chevron-thin-right" size={15} color="white" />
        </Button>

        <Button
          style={buttonStyle2}
          rounded
          onPress={() => {
            navigation.navigate(RouteName.SIGNUPSELECTION);
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={logoStyle1}
              source={require('./../../images/TYFTLogo.png')}
            />
            <Text
              uppercase={false}
              style={{marginLeft: responsiveWidth(5)}}
              value={'New Account'}
            />
          </View>
          <Entypo name="chevron-thin-right" size={15} color="rgb(0, 0, 0)" />
        </Button>
      </View>

      <View style={FooterText}>
        <View style={{flexDirection: 'row', marginBottom: responsiveHeight(5)}}>
          <Text value={'Already have an account?'} />
          <Text
            style={Underline}
            onPress={() => {
              navigation.navigate('App');
            }}
            value={'Log in'}
          />
        </View>
          <TouchableOpacity onPress={()=>navigation.navigate(RouteName.SEARCHTRUCK)} style={TouchStyle} >
          <Text style={Underline} value={'Sign In Later'} />
          </TouchableOpacity>
    
      </View>
    </Container>
    // </Animation>
  );
};
const styles = StyleSheet.create({
  container: {
	marginTop: responsiveHeight(10),
	width:'100%',
	height:responsiveHeight(22),
	justifyContent: 'center',
	alignItems:'center'
    // marginHorizontal: responsiveWidth(32),
  },
  logoStyle: {
    height: responsiveHeight(20),
    width: responsiveWidth(40),
    resizeMode: 'contain',
  },
  logoStyle1: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
    resizeMode: 'contain',
  },
  TextStyle: {
    width: responsiveWidth(40),
    color:'rgb(193, 32, 38)',
    marginLeft:responsiveWidth(10)
  },
  TouchStyle:{
    marginRight:responsiveWidth(3)
  },
  buttonStyle: {
    backgroundColor: '#3b589c',
    width: responsiveWidth(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  buttonStyle1: {
    marginTop: responsiveHeight(5),
    backgroundColor: 'rgb(234, 66, 53)',
    width: responsiveWidth(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  buttonStyle2: {
    marginTop: responsiveHeight(5),
    backgroundColor: 'white',
    width: responsiveWidth(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: responsiveWidth(5),
    paddingLeft: responsiveWidth(4),
    // paddingHorizontal:responsiveWidth(5),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(0, 0, 0)',
  },
  ButtonViewStyle: {
    marginTop: responsiveHeight(5),
    marginHorizontal: responsiveWidth(18),
  },
  FooterText: {
    alignItems: 'center',
    marginTop: responsiveHeight(6),
  },
  Underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: responsiveWidth(1),
  },
});

export default Home;
