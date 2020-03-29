import PropTypes from "prop-types";
import React from 'react';
import {  ListItem, CheckBox, Body, View } from 'native-base';
import Text from './Text';
import {StyleSheet} from 'react-native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
 const tyftCheckbox =({checked,TextVal,style,color,onPress, ...props})=> {
     const {
        checkStyle,
        ViewStyle,
        TextStyle
     } =styles;
    return (
        <View style={ViewStyle}>
                <CheckBox style={[checkStyle,style]} color={color} checked={checked} onPress={onPress} {...props}/>
                 <Text value={TextVal} style={TextStyle}/>
        </View>
    );
}

tyftCheckbox.propTypes = {
  TextVal: PropTypes.string,
  checked: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  color:PropTypes.string
}


tyftCheckbox.defaultProps = {
    TextVal:'Default',
    checked:true,
    onPress:()=>{},
    style: {},
    color:'rgb(193, 32, 38)'
};

const styles = StyleSheet.create({
    checkStyle:{
        //:'rgb(193, 32, 38)'
    },
    ViewStyle:{
        width:responsiveWidth(75),
        flexDirection:'row'
    },
    TextStyle:{
        
        marginTop:responsiveHeight(-1),
        marginLeft:responsiveWidth(6),
        
        fontWeight:'500',
        fontSize:responsiveFontSize(2)
    }
})



export default tyftCheckbox;