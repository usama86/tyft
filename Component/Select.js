import PropTypes from "prop-types";
import React from 'react';
import {StyleSheet} from 'react-native';
import { Item, Picker,Icon } from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const Select =({itemList,value,onChange,placeholder,style,containerStyle})=> { 
    return (
            <Item picker style={[styles.itemStyle,containerStyle]}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={[styles.PickerStyle,style]}
                placeholder={placeholder}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={value}
                onValueChange={onChange}
              >
                {itemList ?itemList.map((data)=>{
                    return(
                      <Picker.Item label={data.label} value={data.value} />           
                    )
                }):null}
              </Picker>
            </Item>
    );
}

Select.propTypes = {
  itemList: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string
}
Select.defaultProps ={
  itemList: [{label:'Menu Category',value:''},{label:'Item2',value:'item3'}],
  onChange: ()=>{},
  placeholder: "Menu",
  style: {},
  value: "item"
}

const styles= StyleSheet.create({
  PickerStyle:{
    // backgroundColor:'red',
    // borderWidth:4,
    // borderColor:'green',
    // borderRadius:4
  },
  itemStyle:{
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    paddingBottom:responsiveHeight(3),
    paddingLeft:responsiveWidth(4),
    borderWidth:4,
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    //borderColor:'grey',
    borderRadius:33,
   // backgroundColor:'red'
  }
})



export default Select;