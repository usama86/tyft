import PropTypes from "prop-types";
import React from 'react';
import {StyleSheet} from 'react-native';
import { Item, Input } from 'native-base';
import {responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
const  TextBox =({rounded,regular,style,onChangeText,value,...props})=> {
    
    return (
          <Item rounded={rounded} regular={regular}  style={[styles.Input,style]}>
            <Input {...props} onChangeText={onChangeText} value={value} />
          </Item>

    );
}

TextBox.propTypes = {
  onChangeText: PropTypes.func,
  regular: PropTypes.string,
  rounded: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string
}
TextBox.defaultProps ={
    onChangeText: ()=>{},
    regular: '',
    rounded: 'rounded',
    style: {},
    value: ''
}

const styles=StyleSheet.create({
    Input:{
        width:responsiveWidth(80),
        height:responsiveHeight(6),
        backgroundColor:'white'
    }
})
export default TextBox;