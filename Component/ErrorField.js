import PropTypes from 'prop-types';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button} from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const ErrorField = ({style, children, ...props}) => {
  return (
    <View style={[styles, styles.errorView]}>
      <Text style={styles.errorText}>{children}</Text>
    </View>
  );
};

ErrorField.propTypes = {
  children: PropTypes.array,
  style: PropTypes.object,
};
ErrorField.defaultProps = {
  children: <Text>Hello</Text>,
  style: {},
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: responsiveFontSize(1.5),
  },
  errorView: {
      top:responsiveHeight(1),
    width: '90%',
    alignSelf: 'center',
  },
});

export default ErrorField;
