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
const ItemCategory = ({navigation}) => {
  const [menuItem, setMenuItem] = useState();
  const [indicator, setIndicator] = useState(false);
  const [Data, setData] = useState([]);
  useEffect(() => {
    getMenuOfSupplier();
  }, []);
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
        <Text
          style={{
            fontSize: responsiveFontSize(1.6),
            color: '#A6A6A6',
            marginTop: responsiveHeight(1),
          }}
          value={item.description}
        />
      </View>
      <View style={styles.Right}>
        <Text value={'$ ' + item.price} />
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.parent}>
      <Header isHome onPress={() => navigation.openDrawer()}>
        {'Menu'}
      </Header>
      <View style={styles.HeadingContainer}>
        {/* <Text style={{textTransform: 'uppercase'}} bold value={'Menu'} /> */}
        <TextInput
          placeholder={'Mexican'}
          value={menuItem}
          editable={false}
          selectTextOnFocus={false}
          //onChangeText={val => setMenuItem(val)}
          style={styles.input}
        />
      </View>

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
    width: '70%',
  },
  Right: {
    width: '15%',
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ItemCategory;
