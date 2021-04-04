import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Image, ActivityIndicator, TextInput } from 'react-native';
import { Text, CheckBox, Icon } from 'react-native-elements';
import HeaderLabel from './../../../Component/Text';
import RoundButton from './../../../Component/Button';
// import theme from '../../theme';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import * as Screens from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import AsyncStorage from '@react-native-community/async-storage';
import url, { bold } from './../Constants/constants';
import axios from 'axios';
import Modal from '../../../Component/Modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Language } from '../../../Constants/LanguageChangeFunc';
function Schedule({ navigation, route }) {
	const [ setting, setSetting ] = useState([
		{
			day: 'Monday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM',
			isDatePickerVisible: false,
			isDatePickerVisible2: false
		},
		{
			day: 'Tuesday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM',
			isDatePickerVisible: false,
			isDatePickerVisible2: false
		},
		{
			day: 'Wednesday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM',
			isDatePickerVisible: false,
			isDatePickerVisible2: false
		},
		{
			day: 'Thursday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM',
			isDatePickerVisible: false,
			isDatePickerVisible2: false
		},
		{
			day: 'Friday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM',
			isDatePickerVisible: false,
			isDatePickerVisible2: false
		},
		{
			day: 'Saturday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM',
			isDatePickerVisible: false
		},
		{
			day: 'Sunday',
			working: false,
			opening: '8:00 AM',
			closing: '5:00 PM',
			isDatePickerVisible: false
		}
	]);
	const changeClosing = (e, index) => {
		let newArr = [ ...setting ];
		newArr[index].closing = e;
		setSetting(newArr);
	};
	const changeOpening = (e, index) => {
		let newArr = [ ...setting ];
		newArr[index].opening = e;
		setSetting(newArr);
	};
	const [ showModal, setShowModal ] = useState(false);
	const [ indicator, setIndicator ] = useState(false);
	const updateSchedule = async () => {
		setIndicator(true);
		let TruckID = await AsyncStorage.getItem('TruckID');
		let activeSchedule = setting.filter((item) => item.working);
		axios
			.post(url + '/api/supplier/updateSchedule', {
				_id: TruckID,
				schedule: activeSchedule
			})
			.then(async (Response) => {
				const ERROR = Response.data.code;
				if (ERROR === 'ABT0000') {
					setIndicator(false);
					setShowModal(true);
					setTimeout(() => {
						setShowModal(false);
						navigation.goBack();
					}, 500);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		let updatedArray = [ ...setting ];
		for (let i = 0; i < updatedArray.length; i++) {
			let open = route.params.schedule.find((item) => item.day === updatedArray[i].day);

			updatedArray[i].working = open !== undefined ? true : false;
			updatedArray[i].opening =
				open !== undefined && route.params.schedule[i]
					? route.params.schedule[i].opening
					: updatedArray[i].opening;
			updatedArray[i].closing =
				open !== undefined && route.params.schedule[i]
					? route.params.schedule[i].closing
					: updatedArray[i].closing;
		}
		setSetting(updatedArray);
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<Header isHome onPress={() => navigation.openDrawer()}>
				{Language['Schedule']}
			</Header>
			<ScrollView>
				<View style={styles.formContainer}>
					<View style={styles.tableHeader}>
						<Text style={styles.dayColumnView}>Day</Text>
						<Text style={styles.timeColumnView}>Time</Text>
					</View>
					{setting.map((item) => (
						<View key={item.day} style={styles.item}>
							<View style={styles.dayColumnView}>
								<CheckBox
									title={item.day}
									size={14}
									textStyle={styles.checkboxTextStyle}
									checked={item.working}
									checkedColor="black"
									onPress={() => {
										item.working = !item.working;
										setSetting([ ...setting ]);
									}}
									containerStyle={styles.checkbox}
								/>
							</View>
							<View style={styles.timeColumnView}>
								<View style={styles.underlineView}>
									<Text>{item.opening}</Text>
								</View>
								<Icon
									onPress={() => {
										item.isDatePickerVisible = true;
										setSetting([ ...setting ]);
									}}
									name="clockcircleo"
									type="antdesign"
									size={15}
								/>
								<DateTimePickerModal
								
									isVisible={item.isDatePickerVisible}
									mode="time"
									display="spinner"
									onConfirm={(date) => {
										item.opening = moment(date).format('hh:mm A');
										item.isDatePickerVisible = false;
										setSetting([ ...setting ]);
									}}
									onCancel={() => {
										item.isDatePickerVisible = false;
										setSetting([ ...setting ]);
									}}
								/>
								<Text>-</Text>
								<View style={styles.underlineView}>
									<Text>{item.closing}</Text>
								</View>
								<DateTimePickerModal
									isVisible={item.isDatePickerVisible2}
									mode="time"
									display="spinner"
									onConfirm={(date) => {
										item.closing = moment(date).format('hh:mm A');
										item.isDatePickerVisible2 = false;
										setSetting([ ...setting ]);
									}}
									onCancel={() => {
										item.isDatePickerVisible2 = false;
										setSetting([ ...setting ]);
									}}
								/>
								<Icon
									onPress={() => {
										item.isDatePickerVisible2 = true;
										setSetting([ ...setting ]);
									}}
									name="clockcircleo"
									type="antdesign"
									size={15}
								/>
							</View>
						</View>
					))}
				</View>
			</ScrollView>
			<View style={styles.buttons}>
				{indicator ? (
					<View style={styles.buttonStyle2}>
						<ActivityIndicator color={'#fff'} size={'large'} />
					</View>
				) : (
					<RoundButton style={styles.buttonStyle2} onPress={updateSchedule}>
						<Text uppercase={false} style={styles.TextStyle1}>
							{Language['Done']}
						</Text>
					</RoundButton>
				)}
			</View>
			<Modal ModalContainer={styles.modalView} showModal={showModal}>
				<View style={styles.IconView}>
					<Image
						style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
						source={require('../../../images/button.png')}
					/>
				</View>
				<Text style={styles.UpdatedText}>{'Updated'}</Text>
			</Modal>
		</SafeAreaView>
	);
}

export default Schedule;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	formContainer: {
		marginLeft: 40,
		marginRight: 40,
		marginTop: 20,
		marginBottom: 20,
		flex: 2
	},
	tableHeader: {
		flexDirection: 'row',
		flex: 1,
		backgroundColor: 'rgb(238,238,238)',
		padding: 5,
		paddingLeft: 10,
		marginTop: 10,
		alignItems: 'center'
	},
	item: {
		flexDirection: 'row',
		flex: 1,
		marginTop: 20,
		alignItems: 'center'
	},
	checkboxTextStyle: {
		fontWeight: 'normal'
	},
	checkbox: {
		flex: 1,
		padding: 0,
		margin: 0,
		minWidth: 5,
		backgroundColor: 'white',
		borderColor: 'white'
	},
	dayColumnView: {
		flex: 1.5
	},
	timeColumnView: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	underlineView: {
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
		paddingBottom: 5
	},
	buttonStyle: {
		flex: 2
	},
	fillView: {
		flex: 1
	},
	buttons: {
		// paddingLeft: 40,
		// paddingRight: 40,
		// paddingBottom: 20,
		width: '80%',
		alignSelf: 'center',
		marginBottom: responsiveHeight(2),
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	buttonStyle2: {
		backgroundColor: 'rgb(193, 32, 38)',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: responsiveHeight(6),
		borderRadius: 8

		// borderStyle: 'solid',
		// borderWidth: 1,
		// borderColor: 'rgb(0, 0, 0)'
	},
	TextStyle1: {
		color: 'white'
	},
	IconView: {
		width: '90%',
		alignSelf: 'center',
		height: responsiveHeight(20),
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: responsiveHeight(2)
	},
	UpdatedText: {
		fontFamily: bold,
		fontSize: responsiveFontSize(2.5),
		color: '#1AB975',
		textAlign: 'center'
	},
	modalView: {
		paddingVertical: responsiveHeight(3)
	}
});
