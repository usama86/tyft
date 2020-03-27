import PropTypes from "prop-types";
import React from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content } from 'native-base';

const tyftContainer=({containerStyle,ContentStyle,...props})=>{
    const {
        container,
        content
    }= styles;
return(
    <Container 
        {...props}
        style={[container,containerStyle]}
    >
        <Content style={[content,ContentStyle]}>
        {props.children}
        </Content>
    </Container>
)

}

Container.propTypes = {
  children: PropTypes.any
}
const styles= StyleSheet.create({
    container:{
        width: '100%',
        height: '100%'
    },
    content:{

    }
})

export default tyftContainer;