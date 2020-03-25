import React from 'react';
import {StyleSheet} from 'react-native';
import { Item, Input } from 'native-base';
import {responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
const  TextBox =({rounded,regular,style,...props})=> {
    
    return (
          <Item rounded={rounded} regular={regular} style={[styles.Input,style]}>
            <Input {...props} />
          </Item>

    );
}
const styles=StyleSheet.create({
    Input:{
        width:responsiveWidth(80),
        height:responsiveHeight(6),
        backgroundColor:'white'
    }
})
export default TextBox;