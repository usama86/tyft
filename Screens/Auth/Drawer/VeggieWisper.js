import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Container from '../../../Component/Container';
import Text from '../../../Component/Text';
import theme from '../../theme';
import {SearchBar, Rating} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import {Switch} from 'react-native-switch';
import Button from '../../../Component/Button';
import CountButton from '../../../Component/CountButton';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as RouteName from '../../../Constants/RouteName';
import Header from '../../../Component/Header';
const VeggieWisper = ({navigation}) => {
  const [ToggleSwitch, setToggleSwitch] = useState(false);
  const [button, setButton] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  return (
    <Container>
      <View style={styles.HeaderContainer}>
        <ImageBackground
          style={styles.image}
          source={require('../../../images/art.jpg')}>
          <Header isHome onPress={() => navigation.openDrawer()}>
            {'Home'}
          </Header>
        </ImageBackground>
      </View>
      <CountButton/>

      <View style={styles.flexView}>
        <Text bold style={{color: 'blue'}} value={'The Veggie Whisper'} />
      </View>
      <View style={[styles.flexView, {marginTop: 0}]}>
        <Rating startingValue={3.5} imageSize={responsiveFontSize(2.8)} />
        <View
          style={{
            flexDirection: 'row',
            width: '30%',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'green',
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2),
            }}
            value={'OPEN'}
          />
          <Switch
            value={ToggleSwitch}
            onValueChange={val => setToggleSwitch(val)}
            activeText={'On'}
            inActiveText={'Off'}
            circleSize={30}
            barHeight={responsiveHeight(3.2)}
            circleBorderWidth={0}
            backgroundActive={'green'}
            backgroundInactive={'rgb(200,200,200)'}
            circleActiveColor={'white'}
            circleInActiveColor={'white'}
            innerCircleStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }} // style for inner animated circle for what you (may) be rendering inside the circle
            outerCircleStyle={{}} // style for outer animated circle
            switchLeftPx={2.2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={2.2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
          />
        </View>
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
    width: responsiveWidth(30),
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

export default VeggieWisper;
