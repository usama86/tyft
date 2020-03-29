import PropTypes from "prop-types";
import React from 'react';
import {StyleSheet} from 'react-native';
import { Item, Input } from 'native-base';
import {responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
const  tyftTextBox =({rounded,regular,style,onChangeText,value,...props})=> {
    const {
      InputDesign
    } =styles;
    return (
          <Item rounded={rounded} regular={regular}  style={[InputDesign,style]}>
            <Input {...props} onChangeText={onChangeText} value={value} />
          </Item>

    );
}

tyftTextBox.propTypes = {
  onChangeText: PropTypes.func,
  regular: PropTypes.string,
  rounded: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string
}
tyftTextBox.defaultProps ={
    onChangeText: ()=>{},
    regular: '',
    rounded: 'rounded',
    style: {},
    value: ''
}

const styles=StyleSheet.create({
    InputDesign:{
        width:responsiveWidth(80),
        height:responsiveHeight(6),
        backgroundColor:'white',
        paddingLeft:responsiveWidth(3)
    }
})
export default tyftTextBox;