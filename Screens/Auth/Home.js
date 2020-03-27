import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Text from './../../Component/Text';
import Button from '../../Component/Button';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconss from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import * as RouteName from '../../Constants/RouteName';
import Animation from './../../Component/Animation';
import Container from './../../Component/Container';

const Home = ({ navigation }) => {
	const {
		container,
		logoStyle,
		TextStyle,
		buttonStyle,
		buttonStyle1,
		buttonStyle2,
		ButtonViewStyle,
		FooterText,
		Underline,
		logoStyle1
	} = styles;
	return (
		//    <Animation>
		<Container>
				<View style={container}>
					<View>
						<Image style={logoStyle} source={require('./../../images/TYFTLogo.png')} />
					</View>
					<View>
						<Text style={TextStyle} numberOfLines={1} value={'S I G N U P'}/>
					</View>
				</View>

				<View style={ButtonViewStyle}>
					<Button style={buttonStyle} rounded>
						<Icon name="sc-facebook" size={30} color="white" />
						<Text uppercase={false} value={'With Facebook'}/>
						<Entypo
							style={{ marginLeft: responsiveWidth(16) }}
							name="chevron-thin-right"
							size={15}
							color="white"
						/>
					</Button>

					<Button style={buttonStyle1} rounded>
						<Iconss name="google" size={25} color="white" />
						<Text uppercase={false} style={{ marginLeft: responsiveWidth(1) }} value={'With Google'}/>
						<Entypo
							style={{ marginLeft: responsiveWidth(20) }}
							name="chevron-thin-right"
							size={15}
							color="white"
						/>
					</Button>

					<Button
						style={buttonStyle2}
						rounded
						onPress={() => {
							navigation.navigate(RouteName.SIGNUPSELECTION);
						}}
					>
						<Image style={logoStyle1} source={require('./../../images/TYFTLogo.png')} />
						<Text uppercase={false} style={{ color: 'rgb(0, 0, 0)' }} value={'New Account'}/>
						<Entypo
							style={{ marginLeft: responsiveWidth(18) }}
							name="chevron-thin-right"
							size={15}
							color="rgb(0, 0, 0)"
						/>
					</Button>
				</View>

				<View style={FooterText}>
					<View style={{ flexDirection: 'row', marginBottom: responsiveHeight(5) }}>
						<Text value={'Already have an account?'}/>
						<Text
							style={Underline}
							onPress={() => {
								navigation.navigate(RouteName.SIGNIN);
                            }}
                            value={'Log in'}
						/>
					</View>

					<Text style={Underline} value={'Sign In Later'}/>
				</View>
		</Container>
		// </Animation>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: responsiveHeight(10),
		marginHorizontal: responsiveWidth(32)
	},
	logoStyle: {
		height: responsiveHeight(20),
		width: responsiveWidth(40),
		resizeMode: 'contain'
	},
	logoStyle1: {
		height: responsiveHeight(4),
		width: responsiveWidth(7),
		resizeMode: 'contain',
		marginLeft: responsiveWidth(3)
	},
	TextStyle: {
		color: 'rgb(0, 0, 0)',
		marginHorizontal: responsiveWidth(10),
		width: responsiveWidth(20)
	},
	buttonStyle: {
		backgroundColor: '#3b589c',
		marginVertical: responsiveHeight(2),
		width: responsiveWidth(70),
		justifyContent: 'flex-start',
		paddingLeft: 24
	},
	buttonStyle1: {
		backgroundColor: 'rgb(234, 66, 53)',
		marginVertical: responsiveHeight(2),
		width: responsiveWidth(70),
		justifyContent: 'flex-start',
		paddingLeft: 27
	},
	buttonStyle2: {
		backgroundColor: 'white',

		marginVertical: responsiveHeight(5),
		width: responsiveWidth(70),
		justifyContent: 'flex-start',
		paddingLeft: 10,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgb(0, 0, 0)'
	},
	ButtonViewStyle: {
		marginTop: responsiveHeight(5),
		marginHorizontal: responsiveWidth(18)
	},
	FooterText: {
		alignItems: 'center',
		marginTop: responsiveHeight(2)
	},
	Underline: {
		textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginLeft:responsiveWidth(1)
	}
});

export default Home;
