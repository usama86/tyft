import React from 'react';
import { View, StyleSheet, Alert, alert, Image,SafeAreaView } from 'react-native';
import Input from '../../../Component/Input';
import Text from '../../../Component/Text';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Checkbox from '../../../Component/Checkbox';
import Ui from '../../../Component/Ui';
import * as RouteName from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import ErrorView from '../../../Component/ErrorField';
import AsyncStorage from '@react-native-community/async-storage';
import url, { bold } from '../Constants/constants';
import axios from 'axios';
import Modal from '../../../Component/Modal';
import { Language } from '../../../Constants/LanguageChangeFunc';
const MenuSetting = ({ navigation, route }) => {
	const [ facebook, setFacebook ] = React.useState('');
	const [ instagram, setInstagram ] = React.useState('');
	const [ twitter, setTwitter ] = React.useState('');
	const [ update, setUpdated ] = React.useState(null);

	React.useEffect(() => {
		getSocialMedia();
	}, []);

	const [ Data, setData ] = React.useState([]);

	const getSocialMedia = async () => {
		let TruckId = await AsyncStorage.getItem('TruckID');
		axios
			.post(url + '/api/supplier/getsocialmedia', {
				_id: TruckId
			})
			.then(async (Response) => {
				let ERROR = Response.code;
				let Trucks = Response;
				if (ERROR !== 'ABT0001') {
					setFacebook(Response.data.facebook);
					setInstagram(Response.data.instagram);
					setTwitter(Response.data.twitter);
					// let filtered = Trucks.filter(item => item.status === 'Open');
					// setDatas(filtered);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onSaveSocialMedia = async () => {
		let TruckId = await AsyncStorage.getItem('TruckID');

		let socialMedia = {
			facebook: facebook,
			instagram: instagram,
			twitter: twitter
		};
		axios
			.post(url + '/api/supplier/updatesocialmedia', {
				_id: TruckId,
				socialMedia: socialMedia
			})
			.then(async (Response) => {
				let ERROR = Response.code;
				let Trucks = Response;
				if (ERROR !== 'ABT0001') {
					setUpdated(true);
					setTimeout(() => {
						setUpdated(false);
					}, 2000);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<SafeAreaView style={{ height: '100%', width: '100%' }}>
			<Header isHome onPress={() => navigation.openDrawer()}>
				{Language['Social Media']}
			</Header>
			<Ui TextShow={false} ButtonText={Language['Save']} onPressButton={onSaveSocialMedia}>
				<View style={styles.InputMainView}>
				<Text bold value='Social Media' style={{marginLeft:responsiveWidth(3),fontSize:responsiveFontSize(2.5)}}/>
					<View style={styles.Time}>
					<Text value='FACEBOOK' style={{marginLeft:responsiveWidth(3),fontSize:responsiveFontSize(2),marginTop:responsiveHeight(5),color:'grey'}}/>
						<Input
							rounded
							placeholder="Facebook"
							value={facebook}
							onChangeText={(e) => setFacebook(e)}
							style={styles.Input}
						/>
						{/* {facebook.Error ? (
              <ErrorView>{facebook.ErrorText}</ErrorView>
            ) : null} */}
						<Text value='INSTAGRAM' style={{marginLeft:responsiveWidth(3),fontSize:responsiveFontSize(2),marginTop:responsiveHeight(2),color:'grey'}}/>
						<Input
							rounded
							placeholder="Instagram"
							value={instagram}
							onChangeText={(e) => setInstagram(e)}
							style={styles.Input}
						/>
						{/* {instagram.Error ? (
              <ErrorView>{instagram.ErrorText}</ErrorView>
            ) : null} */}
						<Text value='TWITTER' style={{marginLeft:responsiveWidth(3),fontSize:responsiveFontSize(2),marginTop:responsiveHeight(2),color:'grey'}}/>
						<Input
							rounded
							placeholder="Twitter"
							value={twitter}
							onChangeText={(e) => setTwitter(e)}
							style={styles.Input}
						/>
						{/* {twitter.Error ? <ErrorView>{twitter.ErrorText}</ErrorView> : null} */}
					</View>
				</View>
				<Modal ModalContainer={styles.modalView} showModal={update}>
					<View style={styles.IconView}>
						<Image
							style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
							source={require('../../../images/button.png')}
						/>
					</View>
					<Text style={styles.UpdatedText} value={'Updated'} />
				</Modal>
			</Ui>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	InputMainView: {
		marginVertical: responsiveHeight(0)
	},
	Input: {
		marginTop: responsiveHeight(1)
	},

	TextView: {
		width: '90%',
		marginLeft: responsiveWidth(3),
		borderBottomWidth: 1,
		borderBottomColor: 'grey'
	},
	radioView: {
		flexDirection: 'row'
	},
	Time: {
		height: responsiveHeight(20)
	},
	UpdatedText: {
		fontFamily: bold,
		fontSize: responsiveFontSize(2.5),
		color: '#1AB975',
		textAlign: 'center'
	},
	modalView: {
		paddingVertical: responsiveHeight(3)
	},
	IconView: {
		width: '90%',
		alignSelf: 'center',
		height: responsiveHeight(20),
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: responsiveHeight(2)
	}
});
export default MenuSetting;
