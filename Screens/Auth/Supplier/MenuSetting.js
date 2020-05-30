import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Input from '../../../Component/Input';
import Text from '../../../Component/Text';
import Button from '../../../Component/Button';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Checkbox from '../../../Component/Checkbox';
import Select from '../../../Component/Select';
import Ui from '../../../Component/Ui';
import * as RouteName from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from '../../../Component/Modal';
import AddItemModal from '../../../Component/Modal';
import ErrorView from '../../../Component/ErrorField';
const MenuSetting = ({navigation, route}) => {
  const [addItem, setAddItem] = React.useState(false);
  const [Categories, setCategories] = React.useState([
    {label: 'Italian Food', value: 'Italian Food'},
    {label: 'Thai', value: 'Thai'},
  ]);
  const [Data, setData] = React.useState([]);
  const [SelectedValue, setSelectedValue] = React.useState('Italian Food');
  const [showModal, setShowModal] = React.useState(false);
  const [category, setCategory] = React.useState(null);
  const [name, setName] = React.useState({
    value: null,
    Error: false,
    ErrorText: null,
  });
  const [description, setDescription] = React.useState({
    value: null,
    Error: false,
    ErrorText: null,
  });
  const [price, setPrice] = React.useState({
    value: null,
    Error: false,
    ErrorText: null,
  });
  const changeCategory = e => {
    if (e === '') {
      setCategory(null);
    } else if (e) {
      setCategory(e);
      console.log('Category is here', category);
    }
  };
  const Navigate = () => {
    if (Data.length > 0) {
      navigation.navigate(RouteName.COVERPHOTO, {
        Schedule: route.params.Schedule,
        Name: route.params.Name,
        Email: route.params.Email,
        Phone: route.params.Phone,
        Password: route.params.Password,
        TruckLogo: route.params.TruckLogo,
        TruckName: route.params.TruckName,
        BusinessDescription: route.params.BusinessDescription,
        TruckContact: route.params.TruckContact,
        TruckEmail: route.params.TruckEmail,
        City: route.params.City,
        Website: route.params.Website,
        FacebookID: route.params.FacebookID,
        InstagramID: route.params.InstagramID,
        TwitterID: route.params.TwitterID,
        ServingCusine: route.params.ServingCusine,
        Menu: Data,
      });
    } else {
      Alert.alert('Please Add Menu First');
    }
  };
  const AddToList = () => {
    let newId = 0;
    let newArray = [...Data];
    if (!name.value) {
      setName({value: null, Error: true, ErrorText: 'Name is required.'});
    }
    if (!description.value) {
      setDescription({
        value: null,
        Error: true,
        ErrorText: 'Description is required.',
      });
    }
    if (!price.value) {
      setPrice({value: null, Error: true, ErrorText: 'Price is required.'});
    } else if (name.value && description.value && price.value) {
      newArray.push({
        name: name.value,
        price: price.value,
        description: description.value,
        category: SelectedValue,
      });
      setData(newArray);
      setAddItem(false);
    }
  };
  const closeModal = () => {
    let newArr = [...Categories];
    if (category) {
      newArr.unshift({label: category, value: category});
      setSelectedValue(category);
    }
    setCategories(newArr);
    setShowModal(false);
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
    <View style={{height: '100%', width: '100%'}}>
      <Header
        Add
        onAddPress={() => setAddItem(true)}
        onPress={() => navigation.goBack()}>
        {'Menu'}
      </Header>
      <Ui
        ContainerStyle={{marginTop: responsiveHeight(4)}}
        TextViewStyle={styles.TextViewStyle}
        TextValue={'Menu Setting'}
        ButtonText={'Next'}
        TextShow={false}
        buttonStyle={styles.buttonStyle}
        onPressButton={Navigate}>
        <View style={styles.InputMainView}>
          <AddItemModal
            ModalContainer={{
              paddingVertical: responsiveHeight(2),
              paddingHorizontal: responsiveWidth(2),
            }}
            showModal={addItem}>
            {/* <View style={{height: responsiveHeight(33),paddingVertical:responsiveHeight(2),paddingHorizontal:responsiveWidth(2)}}> */}
            {/* <ScrollView> */}
            <View
              style={{
                width: '80%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Select
                itemList={Categories}
                value={SelectedValue}
                onChange={e => setSelectedValue(e)}
                containerStyle={{width: '100%'}}
                style={[styles.Input, {width: '100%'}]}
              />
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={{left: responsiveWidth(7)}}>
                <AntDesign
                  name={'pluscircle'}
                  color={'rgb(193, 32, 38)'}
                  size={responsiveFontSize(3)}
                />
              </TouchableOpacity>
            </View>

            <Input
              rounded
              placeholder="Name"
              onChangeText={e =>
                setName({value: e, Error: false, ErrorText: null})
              }
              value={name.value}
              style={styles.Input}
            />
            {name.Error ? <ErrorView>{name.ErrorText}</ErrorView> : null}
            <Input
              rounded
              placeholder="Description"
              onChangeText={e =>
                setDescription({value: e, Error: false, ErrorText: null})
              }
              value={description.value}
              style={styles.Input}
            />
            {description.Error ? (
              <ErrorView>{description.ErrorText}</ErrorView>
            ) : null}
            <Input
              rounded
              placeholder="Price"
              onChangeText={e =>
                setPrice({value: e, Error: false, ErrorText: null})
              }
              value={price.value}
              style={styles.Input}
            />
            {price.Error ? <ErrorView>{price.ErrorText}</ErrorView> : null}
            {/* </ScrollView> */}
            {/* </View> */}
            <View style={styles.TextView}>
              <Button style={styles.buttonStyle2} onPress={AddToList}>
                <Text
                  uppercase={true}
                  value={'Add to List'}
                  style={{color: 'white'}}
                />
              </Button>
            </View>
          </AddItemModal>
          <Modal showModal={showModal}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#fff',
                paddingVertical: responsiveHeight(2),
                paddingHorizontal: responsiveWidth(2),
                borderRadius: 8,
              }}>
              <Text style={{textAlign: 'center'}} value={'Add Category'} bold />
              <Input
                rounded
                onChangeText={e => changeCategory(e)}
                value={category}
                placeholder="Category"
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: responsiveHeight(2),
                }}
              />
              <Button
                onPress={closeModal}
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
                  value={'Add'}
                  style={{color: '#fff', fontWeight: 'bold'}}
                />
              </Button>
            </View>
          </Modal>
          {Data.length !== 0 ? (
            <View style={{width: responsiveWidth(90)}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={Data}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      
                      borderBottomColor: 'grey',
                      borderBottomWidth: 1,
                    }}
                  />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                  paddingVertical: responsiveHeight(5),
                }}
                renderItem={({item, index}) => PrintCard(item, index)}
              />
            </View>
          ) : (
            <View style={styles.EmptyDataView}>
              <Text value={'Menu Not Added Yet!'} bold />
            </View>
          )}
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
    width: '90%',
  },
  TextViewStyle: {
    //  width: responsiveWidth(60),
    // borderBottomWidth:1,
    // borderBottomColor:'grey',
  },
  TextStyle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    width: '60%',
  },
  TextView: {
    height: responsiveHeight(15),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  radioView: {
    flexDirection: 'row',
  },

  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: responsiveHeight(7),
    borderRadius: 8,
  },
  buttonStyle: {
    marginTop: responsiveHeight(9.8),
    marginLeft: responsiveWidth(-2.5),
  },
  MainView: {
    paddingVertical:responsiveHeight(2),
    width: '100%',
  },
  Left: {
    width: '100%',
  },
  Right: {
    width: '100%',
  },
  EmptyDataView: {
    width: '100%',
    height: responsiveHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  BoldText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
});
export default MenuSetting;
