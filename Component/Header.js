import PropTypes from 'prop-types';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const Header = ({
  isHome,
  style,
  children,
  Add,
  onAddPress,
  onPress,
  logout,
  navigation,
  NoIcon,
  Logout,
  nothing
}) => {
  return (
    <View>
      <View style={[styles.default, style]}>
        <Text style={styles.text}>{children}</Text>
      </View>
      {NoIcon ? null : isHome ? (
        <TouchableOpacity onPress={onPress} style={styles.homeIcon}>
          <Entypo
            name={'menu'}
            size={responsiveFontSize(3.2)}
            color={'black'}
          />
        </TouchableOpacity>
      ) : nothing ? null : (
        <TouchableOpacity onPress={onPress} style={styles.homeIcon}>
          <AntDesign
            name={'arrowleft'}
            size={responsiveFontSize(3.2)}
            color={'black'}
          />
        </TouchableOpacity>
      )}

      {logout ? (
        <TouchableOpacity onPress={Logout} style={styles.switch}>
          <AntDesign
            name={'poweroff'}
            size={responsiveFontSize(3.2)}
            color={'black'}
          />
        </TouchableOpacity>
      ) : null}
      {Add ? (
        <Ionicon
          onPress={onAddPress}
          style={styles.switch}
          name={'ios-add'}
          size={responsiveFontSize(4)}
          color={'black'}
        />
      ) : null}
    </View>
  );
};

Header.propTypes = {
  children: PropTypes.array,
  onPress: PropTypes.func,
  style: PropTypes.object,
};
Header.defaultProps = {
  children: <Text>{'default'}</Text>,
  onPress: () => {},
  style: {},
};
const styles = StyleSheet.create({
  default: {
    width: '100%',
    paddingVertical: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  text: {
    color: 'black',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  homeIcon: {
    position: 'absolute',
    left: '4%',
    top: responsiveHeight(2),
    elevation: 5,
  },
  switch: {
    position: 'absolute',
    right: '7%',
    top: responsiveHeight(1.8),
    elevation: 5,
  },
});

export default Header;
