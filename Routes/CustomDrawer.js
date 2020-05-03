import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Text, Avatar, Icon, ListItem} from 'react-native-elements';
import * as Screens from './../Constants/RouteName';
import ProfileIcon from 'react-native-vector-icons/AntDesign';
import SignoutIcon from 'react-native-vector-icons/FontAwesome';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
const CustomDrawer = ({navigation}) => {
  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Auth', {screen: Screens.SIGNIN});
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.rowView}>
            <Avatar rounded title={'Good Company'} size="large" />
            <View style={{marginLeft: 20}}>
              <Text style={styles.whiteText}>Usama</Text>
              <Text style={styles.whiteText}>Usama45@gmail.com</Text>
              <Text style={styles.whiteText}>+923455549302</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <ListItem
            title={'Home'}
            leftAvatar={<SignoutIcon name={'history'} size={25} />}
            onPress={() => navigation.navigate(Screens.VEGGIEWISPER)}
          />
          <ListItem
            title={'Schedule'}
            leftAvatar={<SignoutIcon name={'history'} size={25} />}
            onPress={() => navigation.navigate(Screens.SCHEDULED)}
          />
          <ListItem
            title={'Customer Reviews'}
            leftAvatar={
              <Icon name="truck-check" type="material-community" size={25} />
            }
            onPress={() => navigation.navigate(Screens.CUSTOMERREVIEWD)}
          />

          <ListItem
            title={'Menu'}
            leftAvatar={<ProfileIcon name={'user'} size={25} />}
            onPress={() => navigation.navigate(Screens.MENUSETTINGDRAWER)}
          />
          <ListItem
            title={'Item Categories'}
            leftAvatar={<ProfileIcon name={'user'} size={25} />}
            onPress={() => navigation.navigate(Screens.ITEMCATEGORYD)}
          />
          <ListItem
            title={'Profile'}
            leftAvatar={<ProfileIcon name={'user'} size={25} />}
            onPress={() => navigation.navigate(Screens.PROFILED)}
          />
          <ListItem
            style={{marginTop: responsiveHeight(15)}}
            title={'Contact Us'}
            leftAvatar={<ProfileIcon name={'info'} size={25} />}
            onPress={() => navigation.navigate('ContactUs')}
          />
          <ListItem
            title={'Signout'}
            leftAvatar={<SignoutIcon name={'sign-out'} size={25} />}
            onPress={Logout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    // flexDirection: 'column',
  },
  header: {
    backgroundColor: 'black',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 3,
  },
  whiteText: {
    color: '#fff',
  },
});

export default CustomDrawer;
