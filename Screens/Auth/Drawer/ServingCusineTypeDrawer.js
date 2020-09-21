import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Container from '../../../Component/Container';
import Button from '../../../Component/Button';
import Text from '../../../Component/Text';
import theme from '../../theme';
import {SearchBar, Rating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as RouteName from '../../../Constants/RouteName';
import Header from '../../../Component/Header';
import url from '../Constants/constants';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Modal from '../../../Component/Modal';
const FindFoodTruck = ({navigation, route}) => {
  const [indicator, setIndicator] = useState(true);
  const [CusineName, setCusinename] = useState([]);
  const [Datas, setDatas] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = React.useState(null);
  const [update, setUpdated] = React.useState(null);
  useEffect(() => {
    navigation.addListener('focus', () => {
      getCusine();
      getAllTrucks();
    });
  }, []);

  const [Data, setData] = useState([]);
  const getAllTrucks = () => {
    axios
      .get(url + '/api/supplier/getalltruck')
      .then(async Response => {
        let ERROR = Response.data.code;
        let Trucks = Response.data.TruckInfo;
        if (ERROR !== 'ABT0001') {
          let filtered = Trucks.filter(item => item.status === 'Open');
          setDatas(filtered);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getCusine = async () => {
    let TruckId = await AsyncStorage.getItem('TruckID');

    axios
      .get(url + '/api/servingcusine/getcusines')
      .then(async Response => {
        if (Response) {
          if (Response.data.length > 0) {
            let AllCusines = Response.data[0].cusine;
            axios
              .post(url + '/api/supplier/getservingcusine', {
                _id: TruckId,
              })
              .then(async Response => {
                if (Response) {
                  if (Response.data.length > 0) {
                    let res = Response.data;
                    console.log('Selected Cusines', res);
                    // setData(res);
                    res.map(a => {
                      AllCusines.map(b => {
                        if (a.cusineName === b.cusineName && a.checked) {
                          b.checked = true;
                        }
                      });
                      setData(AllCusines);
                    });
                  } else {
                    setData(null);
                  }
                  setIndicator(false);
                } else {
                  setIndicator(false);
                }
              })
              .catch(error => {
                console.log(error);
                setIndicator(false);
              });

            console.log('All Cusines after update', AllCusines);
            setData(AllCusines);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const saveServingCusine = async () => {
    setLoading(true);
    let TruckId = await AsyncStorage.getItem('TruckID');
    axios
      .post(url + '/api/supplier/updateservingcusine', {
        _id: TruckId,
        selectedServingCusines: Data,
      })
      .then(async Response => {
        console.log('Dataaa', Data);
        let ERROR = Response.data.code;
        let Trucks = Response;
        if (ERROR !== 'ABT0001') {
          setUpdated(true);
          setTimeout(() => {
            setLoading(false);
            setUpdated(false);
          }, 2000);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const Checked = (item, index) => {
    let newArr = [...Data];
    //  let dupSelected = [...selectedItems];
    newArr[index].checked = !newArr[index].checked;
    setData(newArr);
    // if (newArr[index].checked) {
    //   dupSelected.push(newArr[index].cusineName);
    // } else {
    //   dupSelected.splice(index, 1);
    // }
    // setData(newArr);
    // setSelectedItems(dupSelected);
  };
  const PrintCard = (item, index) => (
    <TouchableOpacity
      onPress={() => Checked(item, index)}
      activeOpacity={0.8}
      style={[
        styles.MainView,
        item.checked
          ? {backgroundColor: theme.colors.primary, borderWidth: 0}
          : null,
      ]}>
      <Text
        style={[item.checked ? {color: 'white'} : null]}
        value={item.cusineName}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.parent}>
      <Header isHome onPress={() => navigation.openDrawer()}>
        {'Serving By Cuisine Type'}
      </Header>
      {indicator ? (
        <ActivityIndicator
          size={'large'}
          color={'#000'}
          style={styles.indicator}
        />
      ) : Data ? (
        <>
          <View style={{flex: 1}}>
            <ScrollView>
              <FlatList
                data={Data}
                numColumns={3}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                  paddingVertical: responsiveHeight(2),
                }}
                renderItem={({item, index}) => PrintCard(item, index)}
              />
            </ScrollView>
          </View>
          <View style={styles.ApplyButton}>
            <Button
              loading={loading}
              style={[styles.buttonStyle2]}
              rounded
              onPress={saveServingCusine}>
              <Text style={{color: '#fff'}} uppercase={false} value={'Save'} />
            </Button>
          </View>
        </>
      ) : (
        <View
          style={{
            width: '100%',
            height: responsiveHeight(10),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(30),
          }}>
          <Text bold value={'No Cusines Available'} />
        </View>
      )}
      <Modal ModalContainer={styles.modalView} showModal={update}>
        <View style={styles.IconView}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            source={require('../../../images/button.png')}
          />
        </View>
        <Text style={styles.UpdatedText} value={'Updated'} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeadingContainer: {
    height: responsiveHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainView: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(25),
    height: responsiveHeight(6),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderColor: '#212121',
    borderWidth: 1,
    marginLeft: '6.25%',
    backgroundColor: '#fff',
  },
  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: responsiveHeight(6),
    borderRadius: 8,
    marginLeft: responsiveWidth(4),

    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'rgb(0, 0, 0)'
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ApplyButton: {
    height: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: responsiveHeight(6),
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'rgb(0, 0, 0)'
  },
  UpdatedText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
    color: '#1AB975',
    textAlign: 'center',
  },
  modalView: {
    paddingVertical: responsiveHeight(3),
  },
  IconView: {
    width: '90%',
    alignSelf: 'center',
    height: responsiveHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
  },
});

export default FindFoodTruck;
