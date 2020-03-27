import PropTypes from 'prop-types';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const tyftButton = ({ style, children, onPress, ...props }) => {
    const {
        Buttons
    }=styles;
	return (
		<Button {...props} style={[ Buttons, style ]} onPress={onPress}>
			{children}
		</Button>
	);
};

tyftButton.propTypes = {
	children: PropTypes.array,
	onPress: PropTypes.func,
	style: PropTypes.object
};
tyftButton.defaultProps = {
	children: <Text>Hello</Text>,
	onPress: () => {},
	style: {}
};

const styles = StyleSheet.create({
	Buttons: {
		width: responsiveWidth(40),
		height: responsiveHeight(6),
		justifyContent: 'center'
	}
});

export default tyftButton;
