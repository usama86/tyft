import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  alert,
} from 'react-native';
import Container from '../../Component/Container';
import Button from '../../Component/Button';
import Text from '../../Component/Text';
import theme from '../theme';
import {SearchBar, Rating, AirbnbRating} from 'react-native-elements';
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
import axios from 'axios';
import url from './Constants/constants';
import {Textarea} from 'native-base';
import moment from 'moment';
const CustomerReviews = ({navigation, route}) => {
  const [menuItem, setMenuItem] = useState('Mexican');
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [names, setNames] = useState('');
  const [addCommentLoader, setAddCommentLoader] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(null);

  const [Data, setData] = useState([]);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getName();
      getCustomerReviews();
      console.log('TRUCK ID', route.params.ID);
    });
  }, []);

  const getName = async () => {
    let userName = await AsyncStorage.getItem('userName');
    console.log(userName);
    setNames(userName);
    // let date = new Date(time);
  };
  const onPressButton = () => {
    setShowModal(true);
  };
  const getCustomerReviews = async () => {
    let UserID = await AsyncStorage.getItem('userID');
    console.log(UserID);
    axios
      .post(url + '/api/supplier/getcustomerreview', {_id: route.params.ID})
      .then(async Response => {
        let ERROR = Response.data.code;
        let Reviews = Response.data.Review;
        console.log('Reviews', Reviews);
        if (ERROR !== 'ABT0001') {
          setData(Reviews);
          let userID = await AsyncStorage.getItem('userID');
          let isReviewed = Reviews.find(a => a.UserId === userID);
          setAlreadyReviewed(isReviewed);
        } else {
          setisLoading(false);
          setData(null);
        }
      })
      .catch(error => {
        setisLoading(false);
        console.log(error);
      });
  };
  const CalculateTime = date => {
    let years = moment(new Date()).diff(moment(date), 'years');
    if (years === 0) {
      let months = moment(new Date()).diff(moment(date), 'months');
      if (months === 0) {
        let days = moment(new Date()).diff(moment(date), 'days');
        if (days === 0) {
          let hours = moment(new Date()).diff(moment(date), 'hours');
          if (hours === 0) {
            let minutes = moment(new Date()).diff(moment(date), 'minutes');
            if (minutes === 0) {
              return 'now';
            } else {
              return minutes + 'm';
            }
          } else {
            return hours + 'h';
          }
        } else {
          return days + 'd';
        }
      } else {
        return months + 'm';
      }
    } else {
      return years + 'y';
    }
  };
  const AddReviewHandler = async () => {
    if (review !== '') {
      setAddCommentLoader(true);
      console.log(review);
      console.log(rating);
      let userID = await AsyncStorage.getItem('userID');
      let Name = await AsyncStorage.getItem('userName');
      console.log(Name);
      axios
        .post(url + '/api/supplier/addreview', {
          UserID: userID,
          TruckID: route.params.ID,
          Review: {
            Review: review,
            UserId: userID,
            Rating: rating,
            date: new Date(),
            Name: Name,
          },
        })
        .then(async Response => {
          if (Response.data.code !== 'ABT0001') {
            await getCustomerReviews();
            await setShowModal(false);
            await setAddCommentLoader(false);
          }
        })
        .catch(error => {
          setAddCommentLoader(false);
          console.log(error);
        });
    } else Alert.alert('Please type Review');
  };
  const PrintCard = (item, index) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.MainView}>
      <View style={styles.TopView}>
        <Rating
          startingValue={item.Rating}
          imageSize={responsiveFontSize(2.8)}
        />
        <Text style={{color: '#A6A6A6'}} value={item.Name} />
        <Text style={{color: '#A6A6A6'}} value={CalculateTime(item.date)} />
      </View>
      <View style={styles.BottomView}>
        <Text value={item.Review} />
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.parent}>
      <Header onPress={() => navigation.goBack()}>{'Customer Reviews'}</Header>
      {Data ? (
        <>
          <View style={{width: '100%', height: responsiveHeight(75)}}>
            <FlatList
              data={Data}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                paddingVertical: responsiveHeight(2),
              }}
              style={{height: 10}}
              renderItem={({item, index}) => PrintCard(item, index)}
            />
          </View>
          {names ? (
            <View style={{width: '100%'}}>
              <Button
                style={[styles.buttonStyle2]}
                onPress={onPressButton}
                rounded>
                <Text
                  uppercase={false}
                  style={[styles.TextStyle1]}
                  value={'Add a Review'}
                />
              </Button>
            </View>
          ) : null}
        </>
      ) : (
        <Text
          bold
          style={{textAlign: 'center', marginTop: responsiveHeight(10)}}
          value={'No Reviews'}
        />
      )}

      <Model showModal={showModal}>
        <TouchableOpacity activeOpacity={0.8} style={styles.MainView}>
          {alreadyReviewed ? (
            <>
              <View style={{alignSelf:'flex-end'}}>
                <Text
                  style={{color: '#A6A6A6'}}
                  bold
                  value={'x'}
                  onPress={() => setShowModal(false)}
                />
              </View>
              <Text
                style={{color: '#A6A6A6', fontSize: responsiveFontSize(1.6)}}
                value={'You have already Reviewed this Truck'}
                onPress={() => setShowModal(false)}
              />
            </>
          ) : (
            <>
              <View style={styles.TopView}>
                <View style={{marginTop: responsiveHeight(-6)}}>
                  <AirbnbRating
                    // starStyle={{height:responsiveHeight(4),res}}

                    defaultRating={0}
                    reviews={[]}
                    size={responsiveFontSize(2.8)}
                    // startingValue={0}
                    // showRating
                    imageSize={responsiveFontSize(2.8)}
                    // ratingCount={5}
                    onFinishRating={val => setRating(val)}
                  />
                </View>
                {/* <Text
              style={{
                color: '#A6A6A6',
                marginLeft: responsiveWidth(-9),
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2),
              }}
              value={names}
            /> */}

                <Text
                  style={{color: '#A6A6A6'}}
                  bold
                  value={'x'}
                  onPress={() => setShowModal(false)}
                />
              </View>
              <View style={styles.BottomView}>
                <Textarea
                  rowSpan={5}
                  bordered
                  placeholder="Write your Review here"
                  onChangeText={val => setReview(val)}
                />
              </View>

              <View style={styles.TopView1}>
                {addCommentLoader ? (
                  <View
                    style={[
                      styles.buttonStyle2,
                      {
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}>
                    <ActivityIndicator color={'white'} size={'small'} />
                  </View>
                ) : (
                  <Button
                    style={[styles.buttonStyle2]}
                    onPress={AddReviewHandler}
                    rounded>
                    <Text
                      uppercase={false}
                      style={[styles.TextStyle1]}
                      value={'Add Review'}
                    />
                  </Button>
                )}
              </View>
            </>
          )}
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
    marginLeft: responsiveWidth(4),
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
    marginTop: responsiveHeight(2),
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
