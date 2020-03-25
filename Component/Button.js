import React from 'react';
import {StyleSheet} from 'react-native';
import { Button } from 'native-base';
import {responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
const tyftButton=({style,children, ...props})=> {
    return (
          <Button {...props}
          style={[styles.Buttons,style]}
          >
           {children}
          </Button>

    );
  
}
const styles=StyleSheet.create({
    Buttons:{
        width:responsiveWidth(40),
        height:responsiveHeight(6),
        justifyContent:'center'
    }
})
export default tyftButton;