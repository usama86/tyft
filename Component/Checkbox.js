import PropTypes from 'prop-types';
import React from 'react';
import {CheckBox, View, Text} from 'native-base';
import Modal from './Modal';
import {StyleSheet, Linking} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
const tyftCheckbox = ({
  checkboxView,
  checked,
  TextVal,
  style,
  color,
  onPress,
  ...props
}) => {
  const {
    checkStyle,
    ViewStyle,
  } = styles;
  const [termModel, setTermModel] = React.useState(false);
  const [privacyModel, setPrivacyModel] = React.useState(false);
  return (
    <View style={[ViewStyle, checkboxView]}>
      <CheckBox
        style={[checkStyle, style]}
        color={color}
        checked={checked}
        onPress={onPress}
        {...props}
      />
    </View>
  );
};

tyftCheckbox.propTypes = {
  TextVal: PropTypes.string,
  checked: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  color: PropTypes.string,
};

tyftCheckbox.defaultProps = {
  TextVal: 'Default',
  checked: true,
  onPress: () => {},
  style: {},
  color: 'rgb(193, 32, 38)',
};

const styles = StyleSheet.create({
  checkStyle: {
    //:'rgb(193, 32, 38)'
    width: responsiveWidth(4.5),
    height: responsiveHeight(2.3),
  },
  ViewStyle: {
    width: responsiveWidth(75),
    flexDirection: 'row',
  },
  TextStyle: {
    marginTop: responsiveHeight(-0.6),
    marginLeft: responsiveWidth(6),
    fontWeight: '500',
    fontSize: responsiveFontSize(1.7),
  },
  TextStyle1: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.7),
    marginLeft: responsiveWidth(1),
    marginTop: responsiveHeight(-0.6),
    color: 'rgb(193, 32, 38)',
  },
  TextStyle2: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.7),
    marginLeft: responsiveWidth(-62),
    marginTop: responsiveHeight(-0.6),
    color: 'rgb(193, 32, 38)',
  },
  TextStyle3: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.7),
    marginLeft: responsiveWidth(1),
    marginTop: responsiveHeight(1.9),
    color: 'rgb(193, 32, 38)',
  },
  TextStyle4: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.7),
    marginLeft: responsiveWidth(1),
    marginTop: responsiveHeight(1.9),
  },
});

export default tyftCheckbox;
//not general for now
