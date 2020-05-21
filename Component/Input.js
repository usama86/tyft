import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text,View} from 'react-native';
import {Item, Input} from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const tyftTextBox = ({
  rounded,
  regular,
  style,
  onChangeText,
  value,
  secured,
  lower,
  errorText,
  ...props
}) => {
  const {InputDesign, Inputs} = styles;
  return (
    <>
      <Item rounded={rounded} regular={regular} style={[InputDesign, style]}>
        <Input
          secureTextEntry={secured ? true : false}
          {...props}
          onChangeText={onChangeText}
          style={(Inputs, lower ? {textTransform: 'lowercase'} : null)}
          value={value}
        />
      </Item>
      <View style={{width:responsiveWidth(80)}} >
      {errorText ? (
        <Text
          style={{
            top: responsiveHeight(1),
            color: 'red',
            fontSize: responsiveFontSize(1.5),
            alignSelf: 'center',
            width: '92%',
          }}>
          {errorText}
        </Text>
      ) : null}
      </View>
     
    </>
  );
};

tyftTextBox.propTypes = {
  onChangeText: PropTypes.func,
  regular: PropTypes.string,
  rounded: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string,
};
tyftTextBox.defaultProps = {
  onChangeText: () => {},
  regular: '',
  rounded: 'rounded',
  style: {},
  value: '',
};

const styles = StyleSheet.create({
  InputDesign: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    backgroundColor: 'white',
    paddingLeft: responsiveWidth(3),
  },
  Inputs: {
    fontSize: responsiveFontSize(1.8),
    color: '#000',
  },
});
export default tyftTextBox;
