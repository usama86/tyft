import PropTypes from 'prop-types';
import React from 'react';
import {  StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const tyftText = ({ style, bold, value, ...props }) => {
    const {
        TextStyle,
        boldStyle
    } = styles;
	return (
		<Text {...props}  style={[TextStyle,style,bold ? boldStyle:null]}>
			{value}
		</Text>
	);
};

tyftText.propTypes = {
	value: PropTypes.string,
	style: PropTypes.object
};
tyftText.defaultProps = {
	value: null,
	style: {}
};
//

const styles = StyleSheet.create({
	TextStyle: {
        // color: 'rgb(0, 0, 0)'
        //set font stuff for default, font family etc
        fontSize:responsiveFontSize(1.7)
    },
    boldStyle:{
        fontSize:responsiveFontSize(3),
        fontWeight:'bold'
    }
});

export default tyftText;
