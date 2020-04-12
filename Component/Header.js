import PropTypes from 'prop-types';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const Header = ({isHome, style, children, onPress}) => {
  return (
    <View>
      <View style={[styles.default, style]}>
        <Text style={styles.text}>{children}</Text>
      </View>
      {isHome ? (
        <TouchableOpacity onPress={onPress} style={styles.homeIcon}>
          <Entypo
            name={'menu'}
            size={responsiveFontSize(3.2)}
            color={'black'}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.homeIcon}>
          <AntDesign
            name={'arrowleft'}
            size={responsiveFontSize(3.2)}
            color={'black'}
          />
        </TouchableOpacity>
      )}
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
  },
  text: {
    color: 'black',
    fontSize: responsiveFontSize(2.2),
  },
  homeIcon: {
    position: 'absolute',
    left: '4%',
    top: responsiveHeight(2),
  },
});

export default Header;
