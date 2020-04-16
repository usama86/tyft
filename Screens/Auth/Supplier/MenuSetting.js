import React from 'react';
import {View, StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import Input from '../../../Component/Input';
import Text from '../../../Component/Text';
import Button from '../../../Component/Button';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import Checkbox from '../../../Component/Checkbox';
import Select from '../../../Component/Select';
import Ui from '../../../Component/Ui';
import * as RouteName from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
const Data=[
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
];
const MenuSetting = ({navigation}) => {
  const [check, SetCheck] = React.useState(false);
  const [name, SetName] = React.useState('');
  const changeInputHandler = () => {
    SetCheck(!check);
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
        <Text value={'$ '+item.price} />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{height:'100%',width:'100%'}}>
    <Header  onPress={() => navigation.goBack()}>{'Menu'}</Header>
    <Ui
    ContainerStyle={{marginTop:responsiveHeight(4)}}
      TextViewStyle={styles.TextViewStyle}
      TextValue={"Menu Setting"}
      ButtonText={'Next'}
      TextShow={false}
      buttonStyle={styles.buttonStyle}
      
      onPressButton={() => {navigation.navigate(RouteName.COVERPHOTO)}}>
      <View style={styles.InputMainView}>

        <View style={styles.Time}>        
            <Select style={styles.Input} />
            <Input rounded placeholder="Name" style={styles.Input} />
            <Input rounded placeholder="Description" style={styles.Input} />
            <Input rounded placeholder="Price" style={styles.Input} />
        </View>

      <View style={styles.TextView}>  
        <Button
          style={styles.buttonStyle2}
          onPress={()=>{}}>
          {/* <Image style={styles.logoStyle1} source={require('./../images/TYFTLogo.png')} /> */}
          <Text
            uppercase={false}
            // style={[styles.TextStyle1, TextSpace]}
            value={'Add to List'}
            style={{color:'white'}}
          />
        </Button>
      </View>
    <View style={{width:'100%',height:responsiveHeight(32) }}>
      <FlatList
        data={Data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: responsiveHeight(2),
        }}
        renderItem={({item, index}) => PrintCard(item, index)}
      />
    </View> 

      </View>
    </Ui>
    </View>
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  Input: {
    marginTop: responsiveHeight(3),
  },
  TextViewStyle: {
  //  width: responsiveWidth(60),
  // borderBottomWidth:1,
  // borderBottomColor:'grey',
  },
  TextStyle:{
    fontSize:responsiveFontSize(2.4),
    fontWeight:'bold',
    width:'60%'
  },
  TextView: {
    width: '100%',
    flexDirection:'row',
    marginTop:responsiveHeight(5),
    //Left:responsiveWidth(3),
    borderBottomWidth:1,
    borderBottomColor:'grey',
  },
  radioView: {
    flexDirection: 'row',
  },
  Time:{
      height:responsiveHeight(30)
  },
  buttonStyle2: {
    marginLeft:responsiveWidth(1),
    marginBottom:responsiveHeight(1),
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '28%',
    height: responsiveHeight(4),
    borderRadius:8,
    
  },
  buttonStyle:{
    marginTop:responsiveHeight(9.8),
    marginLeft:responsiveWidth(-2.5)
  },
  MainView:{
    height:responsiveHeight(10)
   // width:responsiveWidth(50)
  }
});
export default MenuSetting;
