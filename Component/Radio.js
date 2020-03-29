import PropTypes from "prop-types";
import React, { Component } from 'react';
import {Radio} from 'native-base';
import {StyleSheet} from 'react-native';
 const tyftRadio =({selected,style,onPress, ...props})=> {
     const {
         radio
     } =styles;
    return (
              <Radio selected={selected} onPress={onPress} style={[radio,style]} {...props} />
    );
}

tyftRadio.propTypes = {
  selected: PropTypes.bool,
  style: PropTypes.object,
}
tyftRadio.defaultProps = {
	selected: true,
	style: {}
};

const styles = StyleSheet.create({
    radio:{

    }
})



export default tyftRadio;