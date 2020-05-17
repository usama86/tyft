import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
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
const Account = ({navigation}) => {
  const [name, SetName] = React.useState('');
  const [radio, setRadio] = React.useState(true);
  const [radio1, setRadio1] = React.useState(false);
  const [LoggedIn, setLoggedin] = React.useState(false);
  const changeInputHandler = e => {
    SetName(e);
  };
  const checkUserStatus = async ()=>{
    let userType = await AsyncStorage.getItem('userType');
    if (userType !== null) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  }
  useEffect(() => {
   checkUserStatus()
  }, []);
  return (
    <View style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Account'}</Header>
      {LoggedIn ? (
        <Ui
          TextValue={'Your Customer Account'}
          ButtonText={'Done'}
          TextSpace={styles.TextSpace}
          TextViewStyle={styles.TextViewStyle}>
          <View style={styles.InputMainView}>
            <Input
              rounded
              placeholder="Name"
              onChangeText={changeInputHandler}
              value={name}
              style={styles.Input}
            />
            <Input rounded placeholder="Email Address" style={styles.Input} />
            <Input rounded placeholder="Cell Phone" style={styles.Input} />
            <Input rounded placeholder="Password" style={styles.Input} />
            <Input
              rounded
              placeholder="Re-enter Password"
              style={styles.Input}
            />
          </View>

          <View style={styles.radioView}>
            <Radio
              selected={radio}
              onPress={e => {
                if (radio !== radio1) {
                  var x = radio;
                  var y = radio1;
                  setRadio1(x);
                  setRadio(y);
                } else {
                  setRadio(!radio);
                }
              }}
            />
            <Text value={'English'} style={{marginLeft: responsiveWidth(2)}} />

            <Radio
              selected={radio1}
              onPress={() => {
                if (radio !== radio1) {
                  var x = radio;
                  var y = radio1;
                  setRadio1(x);
                  setRadio(y);
                } else {
                  setRadio1(!radio1);
                }
              }}
              style={{marginLeft: responsiveWidth(8)}}
            />
            <Text value={'Spanish'} style={{marginLeft: responsiveWidth(2)}} />
          </View>
        </Ui>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            resizeMode={'contain'}
            style={{width: '40%', height: '40%'}}
            source={require('../../images/2.jpg')}
          />
          <View style={{marginTop: responsiveHeight(10)}}>
            <Button onPress={()=>{navigation.navigate(Route.SIGNIN)}} style={styles.button}>
              <Text style={{color: '#fff'}} value={'Login'} />
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
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
});
export default Account;
