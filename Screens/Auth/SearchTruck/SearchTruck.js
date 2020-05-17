import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Map from '../../../Component/Maps';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Container from '../../../Component/Container';
import Button from '../../../Component/Button';
import Text from '../../../Component/Text';
import theme from '../../theme';
import * as RouteName from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SettingIcon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
const SearchTruck = ({navigation}) => {

  const [buttonData,setButtonData] = React.useState([]);
  const [indicator, setIndicator] = React.useState(true);

  React.useEffect(()=>{
   
      getCusine();
    
  
  },[])  

  const getCusine = async () => {
    axios
      .get(url + '/api/servingcusine/getcusines')  
      .then(async Response => {  
        if (Response) {
          console.log(Response);
          let res = await Response.data[0].cusine;
         await setButtonData(res);
          console.log('Button',res)
          setIndicator(false);
        } else {
          setIndicator(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }; 

  return (
    // <Container containerStyle={styles.ContainerStyles}>
    <SafeAreaView style={styles.parent}>
      <Header onPress={() => navigation.goBack()}>{'Search Truck'}</Header>
      { indicator ?  
        <ActivityIndicator
        size={'large'}
        color={'#000'}
        style={styles.indicator}
      />
   : <View>
        <View
          style={{
            marginVertical: responsiveHeight(1),
            marginLeft:responsiveWidth(-7),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{width: '80%'}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {buttonData ? buttonData.map(data=>
                     <Button style={styles.button}>
                       <Text style={styles.TextStyle} value={data.cusineName} />
                     </Button>
            ):null}
            </ScrollView> 
          </View>

            <SettingIcon           
              name={'sound-mix'}
              size={38}
              color={'grey'}
              onPress={()=>{navigation.navigate(RouteName.SERVINGCUSINETYPE)}}
              //style={{marginTop:responsiveHeight(1.3),transform: [{ scaleY: 2 }]}}
            />
        </View> 
        <Map />
        </View> }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MapStyle: {
    width: '60%',
    height: responsiveHeight(10),
  },
  flexView: {
    width: '100%',
    height: responsiveHeight(8),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: responsiveWidth(23),
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    marginLeft: responsiveWidth(5),
  },
  TextStyle: {
    color: 'white',
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SearchTruck;
