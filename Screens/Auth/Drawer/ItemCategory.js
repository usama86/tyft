import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Text from '../../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Header from '../../../Component/Header';
import AsyncStorage from '@react-native-community/async-storage';
import url from './../Constants/constants';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from '../../../Component/Modal';
import Input from '../../../Component/Input';
import Button from '../../../Component/Button';
const ItemCategory = ({navigation}) => {
  const [menuItem, setMenuItem] = useState();
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [Data, setData] = useState([]);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    getMenuOfSupplier();
  }, []);

  const deleteItem = async() =>{
    console.log(selected);
    let MenuID = await AsyncStorage.getItem('MenuID');
    let copiedData = [...Data];
    copiedData.splice(selected, 1);
    console.log(url + '/api/menu/updatemenu');
    axios
      .post(url + '/api/menu/updatemenu', {
        _id: MenuID,
        Menu: copiedData,
      })
      .then(async Response => {
        console.log(Response);
        const ERROR = Response.data.code;
        if (ERROR === 'ABT0000') {
          console.log('Updated');
          setData(copiedData);
          setDeleteModal(false); 
        }
      })
      .catch(error => {
        console.log(error);
      });
  
  }
  const getMenuOfSupplier = async () => {
    setIndicator(true);
    let MenuID = await AsyncStorage.getItem('MenuID');
    axios
      .post(url + '/api/menu/getmenu', {
        _id: MenuID,
      })
      .then(async Response => {
        const ERROR = Response.data.code;
        if (ERROR === 'ABT0000') {
          setIndicator(false);
          setData(Response.data.MenuData);
        } else {
          setIndicator(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const PrintCard = (item, index) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.MainView}>
      <View style={styles.Left}>
        <Text
          style={{fontWeight: 'bold', fontSize: responsiveFontSize(2)}}
          value={item.name}
        />
        {/* <Text
          style={{
            fontSize: responsiveFontSize(1.6),
            color: '#A6A6A6',
            marginTop: responsiveHeight(1),
          }}
          value={item.description}
        /> */}
      </View>
      {/* <View style={styles.Right}>
        <Text value={'$ ' + item.price} />
      </View> */}
      <View style={styles.CrossView}>
        <Entypo
          name={'pencil'}
          color={'black'}
          size={responsiveFontSize(3.2)}
          onPress={() => setShowModal(true)}
        />
      </View>
      <View style={styles.CrossView}>
        <Entypo
          name={'circle-with-cross'}
          color={'black'}
          size={responsiveFontSize(3.2)}
          onPress={() => {
            // let x;
            setSelected(index);
            setDeleteModal(true)
          }}
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.parent}>
      <Header isHome onPress={() => navigation.openDrawer()}>
        {'Menu Category'}
      </Header>
      {/* <View style={styles.HeadingContainer}>
        <TextInput
          placeholder={'Mexican'}
          value={menuItem}
          editable={false}
          selectTextOnFocus={false}
          style={styles.input}
        />
      </View> */}

      {indicator ? (
        <ActivityIndicator color={'#000'} size={'large'} />
      ) : (
        <FlatList
          data={Data}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingVertical: responsiveHeight(2),
          }}
          renderItem={({item, index}) => PrintCard(item, index)}
        />
      )}
      <Modal showModal={showModal}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            paddingVertical: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(2),
            borderRadius: 8,
          }}>
          <View style={[styles.CrossView, {width: '90%'}]}>
            <Entypo
              name={'circle-with-cross'}
              color={'black'}
              size={responsiveFontSize(3.2)}
              onPress={() => setShowModal(false)}
            />
          </View>
          <Text style={{textAlign: 'center'}} value={'Edit Category'} bold />
          <Input
            rounded
            placeholder="Edit Category here"
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: responsiveHeight(2),
            }}
          />
          <Button
            onPress={() => setShowModal(false)}
            style={{
              width: '80%',
              height: responsiveHeight(6),
              backgroundColor: 'rgb(193, 32, 38)',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: responsiveHeight(4),
            }}
            rounded>
            <Text
              uppercase={false}
              value={'Update'}
              style={{color: '#fff', fontWeight: 'bold'}}
            />
          </Button>
        </View>
      </Modal>
      <Modal showModal={showDeleteModal}>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <View style={[styles.CrossView, {width: '100%'}]}>
            <Entypo
              name={'circle-with-cross'}
              color={'black'}
              size={responsiveFontSize(3.2)}
              onPress={() => setDeleteModal(false)}
            />
          </View>
          <Text
            style={{top: responsiveHeight(2)}}
            value={'Are you sure you want to delete this category?'}
          />
          <View
            style={{
              marginVertical: responsiveHeight(2),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: responsiveHeight(12),
            }}>
            <Button
              onPress={deleteItem}
              style={{
                width: '40%',
                height: responsiveHeight(6),
                backgroundColor: 'rgb(193, 32, 38)',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: responsiveHeight(4),
              }}
              rounded>
              <Text
                uppercase={false}
                value={'Yes'}
                style={{color: '#fff', fontWeight: 'bold'}}
              />
            </Button>
            <Button
              onPress={() => setDeleteModal(false)}
              style={{
                width: '40%',
                height: responsiveHeight(6),
                backgroundColor: 'rgb(193, 32, 38)',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: responsiveHeight(4),
              }}
              rounded>
              <Text
                uppercase={false}
                value={'No'}
                style={{color: '#fff', fontWeight: 'bold'}}
              />
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeadingContainer: {
    paddingVertical: responsiveHeight(2),
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  MainView: {
    width: '95%',
    paddingVertical: responsiveHeight(2),
    borderBottomColor: '#212121',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: responsiveWidth(2),
  },
  input: {
    width: '100%',
    padding: 0,
    height: responsiveHeight(5),
    borderBottomColor: '#212121',
    borderBottomWidth: 0.5,
    color: '#A6A6A6',
    fontSize: responsiveFontSize(2),
  },
  Left: {
    width: '75%',
  },
  Right: {
    width: '20%',
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  CrossView: {
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '10%',
    alignSelf: 'center', 
  },
});

export default ItemCategory;
