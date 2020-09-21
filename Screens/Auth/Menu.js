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
import Text from '../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Header from '../../Component/Header';
import axios from 'axios';
import FuzzySearch from 'fuzzy-search';
const Menu = ({navigation,route}) => {
  const [menuItem, setMenuItem] = useState();
  const [isMsg, setIsMsg] = useState(false);
  const [isLoading, setisLoading] =useState(true);
  const [category,setCategory] =useState([]);
  const [Data, setData] = useState([
    // {
    //   id: 0,
    //   name: 'Veggie',
    //   price: '9.00',
    //   description: 'black beans,corn,pics,spinich,sour cream',
    // },
   
  ]);
  React.useEffect(()=>{
    getCategoryOfSupplier();
    getMenu();
  },[]);

  const getCategoryOfSupplier = async () => {
    let TruckId = route.params.TruckID;
    axios
      .post(url + '/api/supplier/getcategory', {
        _id: TruckId,
      })
      .then(async Response => {
        const ERROR = Response.data.code;
        console.log('Ctageogory',Response.data)
        if (ERROR !== 'ABT0001') {
          setCategory(Response.data);
        } else {
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const onChangeSearch = val => {
    setMenuItem(val);
    if (val == '') {
      getMenu();
      setIsMsg(false);
    } else {
      const searcher = new FuzzySearch(Data, ['name'], {
        caseSensitive: false,
      });
      const result = searcher.search(val);
      console.log(result);
      setData(result);
      if (result.length == 0 || result === undefined) {
        setIsMsg(true);
      } else {
        setIsMsg(false);
      }
    }
  };
  
  const getMenu=()=>{
    
    axios
    .post(url + '/api/menu/getmenu',{_id:route.params.Menu})
    .then(async Response => {
      let ERROR = Response.data.code;
      let MenuData = Response.data.MenuData;
      console.log('FAVVV',MenuData)
      if (ERROR !== 'ABT0001') {

        setData(MenuData);
        setisLoading(false);
      } else {
        setisLoading(false);
      }
    })
    .catch(error => {
      setisLoading(false);
      console.log(error);
    });
  }


  const PrintCard = (item, index) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.MainView}>
      <View style={styles.Left}>
        <Text
          style={{fontWeight: 'bold', fontSize: responsiveFontSize(2)}}
          value={item.category}
        />
        <Text
          style={{
            fontSize: responsiveFontSize(1.6),
            color: '#A6A6A6',
            marginTop: responsiveHeight(1),
          }}
          value={item.description}
        />
        <Text
          style={{
            fontSize: responsiveFontSize(1.6),
            color: '#A6A6A6',
            marginTop: responsiveHeight(1),
          }}
          value={item.name}
        />
             <View style={styles.Right}>
        <Text value={'$ ' + item.price} />
      </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.parent}>
      <Header onPress={()=>navigation.goBack()} >{'Menu'}</Header>
      <View style={styles.HeadingContainer}>
        {/* <Text style={{textTransform: 'uppercase'}} bold value={'Menu'} /> */}
        <TextInput
        placeholder={'Search'}
          value={menuItem}
          onChangeText={onChangeSearch}
          style={styles.input}
        />
      </View>
    {isLoading ? 
    <Text 
    value={"No Menu To Show"}
    bold
    style={{
      marginTop: responsiveHeight(25),
      marginLeft: responsiveWidth(25),
    }}
    />
    : isMsg ? (
      <Text 
      value={"No Menu Found"}
      bold
      style={{
        marginTop: responsiveHeight(25),
        marginLeft: responsiveWidth(25),
      }}
      />
      ):(
      <FlatList
      data={Data}
      keyExtractor={item => item.id}
      contentContainerStyle={{
        paddingVertical: responsiveHeight(2),
      }}
      renderItem={({item, index}) => PrintCard(item, index)}
      /> 
      )
    }
    
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
    justifyContent:'center',
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
    width: '90%',
    alignSelf:'center'
  },
  Right: {
    marginTop:responsiveHeight(2),
    width: '15%',
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Menu;
