import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {Text, CheckBox, Icon} from 'react-native-elements';
import HeaderLabel from './../../../Component/Text';
import RoundButton from './../../../Component/Button';
// import theme from '../../theme';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as Screens from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import {Snackbar} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
const week = [
  {
    day: 'Monday',
    working: false,
    opening: '8:00 AM',
    closing: '5:00 PM',
    isDatePickerVisible: false,
    isDatePickerVisible2: false,
  },
  {
    day: 'Tuesday',
    working: false,
    opening: '8:00 AM',
    closing: '5:00 PM',
    isDatePickerVisible: false,
    isDatePickerVisible2: false,
  },
  {
    day: 'Wednesday',
    working: false,
    opening: '8:00 AM',
    closing: '5:00 PM',
    isDatePickerVisible: false,
    isDatePickerVisible2: false,
  },
  {
    day: 'Thursday',
    working: false,
    opening: '8:00 AM',
    closing: '5:00 PM',
    isDatePickerVisible: false,
    isDatePickerVisible2: false,
  },
  {
    day: 'Friday',
    working: false,
    opening: '8:00 AM',
    closing: '5:00 PM',
    isDatePickerVisible: false,
    isDatePickerVisible2: false,
  },
  {
    day: 'Saturday',
    working: false,
    opening: '8:00 AM',
    closing: '5:00 PM',
    isDatePickerVisible: false,
  },
  {
    day: 'Sunday',
    working: false,
    opening: '8:00 AM',
    closing: '5:00 PM',
    isDatePickerVisible: false,
  },
];

function BusinessHour({navigation, route}) {
  const [setting, setSetting] = useState(week);
  const [visible, setVisible] = useState(false);
  const Navigate = () => {
    let Schedule = setting.filter(item => item.working);
    console.log('Schedue', Schedule);
    if (Schedule.length === 0) {
      setVisible(true);
    } else if (Schedule.length > 0) {
      navigation.navigate(Screens.SOCIALMEDIADETAILS, {
        Schedule: Schedule,
        Name: route.params.Name,
        Email: route.params.Email,
        Phone: route.params.Phone,
        Password: route.params.Password,
        TruckLogo: route.params.TruckLogo,
        TruckName: route.params.TruckName,
        BusinessDescription: route.params.BusinessDescription,
        TruckContact: route.params.TruckContact,
        TruckEmail: route.params.TruckEmail,
        City: route.params.City,
        Website: route.params.Website,
      });
    }
  };
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Business Hour'}</Header>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.dayColumnView}>Day</Text>
              <Text style={styles.timeColumnView}>Time</Text>
            </View>
            {setting.map((item, index) => (
              <View key={item.day} style={styles.item}>
                <View style={styles.dayColumnView}>
                  <CheckBox
                    title={item.day}
                    size={14}
                    textStyle={styles.checkboxTextStyle}
                    checked={item.working}
                    checkedColor="black"
                    onPress={() => {
                      let newArr = [...setting];
                      newArr[index].working = !item.working;
                      setSetting(newArr);
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
                      setSetting([...setting]);
                    }}
                    name="clockcircleo"
                    type="antdesign"
                    size={15}
                  />
                  <DateTimePickerModal
                    isVisible={item.isDatePickerVisible}
                    mode="time"
                    display="spinner"
                    onConfirm={date => {
                      item.opening = moment(date).format('hh:mm A');
                      item.isDatePickerVisible= false;
                      setSetting([...setting]);
                    }}
                    onCancel={() => {
                      item.isDatePickerVisible = false;
                      setSetting([...setting]);
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
                    onConfirm={date => {
                      item.closing = moment(date).format('hh:mm A');
                      item.isDatePickerVisible2 = false;
                      setSetting([...setting]);
                    }}
                    onCancel={() => {
                      item.isDatePickerVisible2 = false;
                      setSetting([...setting]);
                    }}
                  />
                  <Icon
                    onPress={() => {
                      item.isDatePickerVisible2 = true;
                      setSetting([...setting]);
                    }}
                    name="clockcircleo"
                    type="antdesign"
                    size={15}
                  />
                  {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.buttons}>
          <View style={styles.fillView} />
          <RoundButton style={styles.buttonStyle2} onPress={Navigate} rounded>
            {/* <Image style={styles.logoStyle1} source={require('./../images/TYFTLogo.png')} /> */}
            <Text uppercase={false} style={styles.TextStyle1}>
              Next
            </Text>
            {/* <Entypo
							//style={{ marginLeft: responsiveWidth(16) }}
							name="chevron-thin-right"
							size={15}
							color="white"s
						/> */}
          </RoundButton>
          <View style={styles.fillView} />
        </View>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={2000}>
          Please Select Schedule
        </Snackbar>
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default BusinessHour;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 20,
    flex: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'rgb(238,238,238)',
    padding: 5,
    paddingLeft: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  checkboxTextStyle: {
    fontWeight: 'normal',
  },
  checkbox: {
    flex: 1,
    padding: 0,
    margin: 0,
    minWidth: 5,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  dayColumnView: {
    flex: 1.5,
  },
  timeColumnView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  underlineView: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  buttonStyle: {
    flex: 2,
  },
  fillView: {
    flex: 1,
  },
  buttons: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: responsiveHeight(6),
    borderRadius: 8,

    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'rgb(0, 0, 0)'
  },
  TextStyle1: {
    color: 'white',
  },
});
