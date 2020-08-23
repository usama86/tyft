import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {
  
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Header from '../../../Component/Header'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class ContactUs extends Component {
  componentDidMount (){
    StatusBar.setBarStyle("dark-content")
  }
  render() {
    return (
      <SafeAreaView style={Styles.contianer}>
     <Header isHome onPress={()=>this.props.navigation.openDrawer()} >{'Contact Us'}</Header>
          <View style={{width:'90%',alignSelf:'center',marginVertical:responsiveHeight(2)}} >
        <Text style={[Styles.textthin,{color:'black',fontSize:responsiveFontSize(2.5),fontWeight:'bold'}]}>{'Get in touch with us.'}</Text>
        </View>
        <View style={Styles.MainContainer}>
          <View style={Styles.LeftIcon}>
            <Ionicons
              name={'ios-mail'}
              color={'black'}
              size={responsiveFontSize(4)}
            />
          </View>
          <View style={Styles.RightContent}>
            <Text style={Styles.textBold}>{'Facing Issues?'}</Text>
            <Text style={Styles.textthin}>{'support@trackyourfoodtruck.com'}</Text>
          </View>
        </View>

        {/* <View style={Styles.MainContainer}>
          <View style={Styles.LeftIcon}>
            <Ionicons
              name={'ios-mail'}
              color={'black'}
              size={responsiveFontSize(4)}
            />
          </View>
          <View style={Styles.RightContent}>
            <Text style={Styles.textBold}>{'For Legal Terms'}</Text>
            <Text style={Styles.textthin}>{'legal@TYFT.com'}</Text>
          </View>
        </View> */}
        {/* <View style ={{width:'85%',height:1,backgroundColor:"#9aa69f",alignSelf:'flex-end'}} /> */}
        <View style={Styles.MainContainer}>
          <View style={Styles.LeftIcon}>
            <AntDesign
              name={'phone'}
              color={'black'}
              size={responsiveFontSize(3.8)}
            />
          </View>
          <View style={Styles.RightContent}>
            <Text style={Styles.textBold}>{'Phone'}</Text>
            <Text style={Styles.textthin}>{'( 209 ) 565-1332'}</Text>
          </View>
        </View>

      
        {/* <View style ={{width:'85%',height:1,backgroundColor:"#9aa69f",alignSelf:'flex-end'}} /> */}
      </SafeAreaView>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  MainContainer: {
  marginVertical:responsiveHeight(1),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height:responsiveHeight(10),
    elevation:5,
    backgroundColor:'white',
    borderRadius:8,
    justifyContent:'space-around'
  },
  LeftIcon: {
    justifyContent: 'center',
  },
  RightContent: {
    justifyContent: 'center',
    width:'60%',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.3),
    color: 'black',
  },
});
