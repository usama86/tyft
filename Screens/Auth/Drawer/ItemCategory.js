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
import Text from '../../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Header from '../../../Component/Header'
const ItemCategory = ({navigation}) => {
  const [menuItem, setMenuItem] = useState();
  const [Data, setData] = useState([
    {
      id: 0,
      name: 'Veggie',
      price: '9.00',
      description: 'black beans,corn,pics,spinich,sour cream',
    },
    {
      id: 1,
      name: 'Veggie',
      price: '9.00',
      description: 'black beans,corn,pics,spinich,sour cream',
    },
    {
      id: 2,
      name: 'Veggie',
      price: '9.00',
      description: 'black beans,corn,pics,spinich,sour cream',
    },
    {
      id: 3,
      name: 'Veggie',
      price: '9.00',
      description: 'black beans,corn,pics,spinich,sour cream',
    },
    {
      id: 4,
      name: 'Veggie',
      price: '9.00',
      description: 'black beans,corn,pics,spinich,sour cream',
    },
    {
      id: 5,
      name: 'Veggie',
      price: '9.00',
      description: 'black beans,corn,pics,spinich,sour cream',
    },
    {
      id: 6,
      name: 'Veggie',
      price: '9.00',
      description: 'black beans,corn,pics,spinich,sour cream',
    },
    {
      id: 7,
      name: 'Veggie',
      price: '9.00',
      description: 'black beans,corn,pics,spinich,sour cream',
    },
  ]);
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
      <Header isHome onPress={()=>navigation.openDrawer()} >{'Menu'}</Header>
      <View style={styles.HeadingContainer}>
        {/* <Text style={{textTransform: 'uppercase'}} bold value={'Menu'} /> */}
        <TextInput
        placeholder={'Mexican'}
          value={menuItem}
          editable={false} selectTextOnFocus={false}
          //onChangeText={val => setMenuItem(val)}
          style={styles.input}
          
        />
      </View>

      <FlatList
        data={Data}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingVertical: responsiveHeight(2),
        }}
        renderItem={({item, index}) => PrintCard(item, index)}
      />
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
