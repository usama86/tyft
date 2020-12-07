import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import theme from './../theme';

import RoundButton from './../../Component/Button';
import Texts from './../../Component/Text';
import * as RouteName from '../../Constants/RouteName';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Header from '../../Component/Header';
import { bold } from './Constants/constants';
const SignUpSelection = props => {
  const {navigation} = props;

  return (
    <View style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Sign Up'}</Header>

      <SafeAreaView style={styles.container}>
        <Text style={styles.signUpHeader}>{'SIGN UP'}</Text>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="#f7f7f5"
          style={styles.item}
          onPress={() => {
            navigation.navigate(RouteName.SIGNUP);
          }}>
          <View>
            <View style={styles.itemHeader}>
              <View style={styles.leftIcon}>
                <Icon
                  name="shopping-cart"
                  color={theme.colors.primary}
                  size={33}
                />
              </View>
              <Text style={styles.itemTitle}>{'As Customer'}</Text>
            </View>
            <Text style={styles.itemText}>
              Search and track your favorite food truck in your area and mark
              them for later use
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="#f7f7f5"
          style={styles.item}
          onPress={() => {
            navigation.navigate(RouteName.SIGNUPSUPPLIER);
          }}>
          <View>
            <View style={styles.itemHeader}>
              <View style={styles.leftIcon}>
                <Icon
                  name="truck-delivery"
                  type="material-community"
                  color={theme.colors.primary}
                  size={33}
                />
              </View>
              <Text style={styles.itemTitle}>{'As Supplier'}</Text>
            </View>
            <Text style={styles.itemText}>
              Create a part of TYFT vendor list and target the local audience
              near you.It helps you to promote your business in your local are.
            </Text>
          </View>
        </TouchableHighlight>
        <RoundButton
          style={styles.buttonStyle2}
          onPress={() => {
            navigation.goBack();
          }}
          rounded>
          <Texts
            uppercase={false}
            style={styles.TextStyle1}
            value={'Back to login'}
          />
        </RoundButton>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 30,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  signUpHeader: {
    fontSize: 23,
    fontWeight: '600',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      },
    }),
    marginTop: 50,
    marginBottom: 50,
    paddingLeft: 60,
  },
  item: {
    height: 150,
    flexDirection: 'column',
    paddingLeft: 50,
    paddingRight: 50,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  leftIcon: {},
  itemTitle: {
    flex: 2,
    fontSize: 15,
 fontFamily:bold,
    paddingLeft: 20,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 12,
    color: 'dimgray',
    lineHeight: 25,
  },
  backButtonContainer: {
    flex: 1,
    margin: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  backButton: {
    backgroundColor: theme.colors.secondary,
  },
  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '73%',
    marginTop: responsiveHeight(22),
    marginLeft: responsiveWidth(14),
    height: responsiveHeight(6),
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'rgb(0, 0, 0)'
  },
  TextStyle1: {
    color: 'white',
  },
});

export default SignUpSelection;
