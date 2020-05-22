import React, {useState} from 'react'; 
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Container from '../../Component/Container';
import Button from '../../Component/Button';
import Text from '../../Component/Text';
import theme from '../theme';
import {SearchBar, Rating,AirbnbRating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as RouteName from '../../Constants/RouteName';

import Model from './../../Component/Modal';
import Header from '../../Component/Header';
import AsyncStorage from '@react-native-community/async-storage';

import {Textarea} from "native-base";
const CustomerReviews = ({navigation}) => {
  const [menuItem, setMenuItem] = useState('Mexican');
  const [showModal,setShowModal] = useState(false);
  const [review,setReview] = useState('')
  const [rating,setRating] = useState(0);
  const [names,setNames] = useState('');

  const [Data, setData] = useState([
    {
      id: 0,
      rating: 3.5,
      Name: 'John Smith',
      time: '2 hour ago',
      review:
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
    {
      id: 1,
      rating: 3,
      Name: 'John Smith',
      time: '2 hour ago',
      review:
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
  ]);

  React.useEffect(()=>{
    getName();
  },[])

  const getName=async()=>{
    let userName = await AsyncStorage.getItem('userName');
    console.log(userName);
    setNames(userName);
    // let date = new Date(time);
  }

  const onPressButton=()=>{
    setShowModal(true);
  }

  const AddReviewHandler=()=>{
    console.log(review);
    console.log(names);
    console.log(rating)
  }
  const PrintCard = (item, index) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.MainView}>
      <View style={styles.TopView}>
        <Rating
          startingValue={item.rating}
          imageSize={responsiveFontSize(2.8)}
        />
        <Text style={{color: '#A6A6A6'}} value={item.Name} />
        <Text style={{color: '#A6A6A6'}} value={item.time} />
      </View>
      <View style={styles.BottomView}>
        <Text value={item.review} />
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.parent}>
      <Header  onPress={() => navigation.goBack()}>{'Customer Reviews'}</Header>
      <View style={{width: '100%', height: responsiveHeight(75)}}>
      <FlatList
        data={Data}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingVertical: responsiveHeight(2),
          
        }}
        style={{height:10}}
        renderItem={({item, index}) => PrintCard(item, index)}
      />
      </View>
      <View style={{width:"100%"}}>
      <Button
          style={[styles.buttonStyle2]}
          onPress={onPressButton}
          rounded>
          <Text
            uppercase={false}
            style={[styles.TextStyle1]}
            value={"Add a Review"}
          />
        </Button>
      </View>
   
   
      <Model showModal={showModal}>
            <TouchableOpacity activeOpacity={0.8} style={styles.MainView}>
            <View style={styles.TopView}>
            <View style={{marginTop:responsiveHeight(-6)}}>
              <AirbnbRating 
                // starStyle={{height:responsiveHeight(4),res}}
                
              defaultRating={0}
              reviews={[]}
              size={responsiveFontSize(2.8)}
                // startingValue={0}
                // showRating 
                imageSize={responsiveFontSize(2.8)}
                // ratingCount={5}
                onFinishRating={(val)=>setRating(val)}
                
              />
            </View>
              <Text style={{color: '#A6A6A6',marginLeft:responsiveWidth(-9),fontWeight:'bold',fontSize:responsiveFontSize(2)}} value={names} />
              
              <Text style={{color: '#A6A6A6'}} bold value={"x"} onPress={()=>setShowModal(false)} />
            </View>
            <View style={styles.BottomView}>
                <Textarea rowSpan={5} bordered placeholder="Write your Review here" onChangeText={(val)=>setReview(val)} />
            </View>

            <View style={styles.TopView1}>
             
            <Button
              style={[styles.buttonStyle2]}
              onPress={AddReviewHandler}
              rounded>
              <Text
                uppercase={false}
                style={[styles.TextStyle1]}
                value={"Add Review"}
              />
            </Button>

            </View>
          </TouchableOpacity>
      </Model>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainView: {
    // height: responsiveHeight(12),
    width: '90%',
    alignSelf: 'center',
    paddingVertical: responsiveHeight(2),
    borderBottomColor: '#212121',
    borderBottomWidth: 0.3,
    alignItems: 'center',
  },
  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: responsiveHeight(6),
    marginLeft:responsiveWidth(4)
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'rgb(0, 0, 0)'
  },
  TextStyle1: {
    color: 'white',
  },
  TopView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TopView1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:responsiveHeight(2)
  },
  BottomView: {
    marginTop: responsiveHeight(2),
    width: '100%',
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CustomerReviews;
