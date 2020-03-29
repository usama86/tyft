import PropTypes from 'prop-types';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const tyftButton = ({style, children,rounded, onPress, ...props}) => {
  const {Buttons,roundedstyle} = styles;
  return (
    <TouchableOpacity style={[Buttons, style,rounded ?roundedstyle:null]} onPress={onPress} {...props}>
      {children}
    </TouchableOpacity>
    // <Button {...props} style={[Buttons, style]} onPress={onPress}>
    //   {children}
    // </Button>
  );
};

tyftButton.propTypes = {
  children: PropTypes.array,
  onPress: PropTypes.func,
  style: PropTypes.object,
};
tyftButton.defaultProps = {
  children: <Text>Hello</Text>,
  onPress: () => {},
  style: {},
};

const styles = StyleSheet.create({
  Buttons: {
    width: responsiveWidth(40),
    height: responsiveHeight(6),
  },
  roundedstyle: {
    borderRadius:33
  },
});

export default tyftButton;
