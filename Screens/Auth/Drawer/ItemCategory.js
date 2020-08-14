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
import AddItemModal from '../../../Component/Modal';
import Select from '../../../Component/Select';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ItemCategory = ({navigation}) => {
  const [menuItem, setMenuItem] = useState();
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [Data, setData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [addItem, setAddItem] = React.useState(false);
  const [SelectedValue, setSelectedValue] = React.useState(null);
  const [showModalAddCatgory, setShowModalAddCategory] = useState(false);
  const [category, setCategory] = React.useState(null);
  const [EditCategory, setEditCategory] = useState(null);
  const [Categories, setCategories] = React.useState([
    {label: 'Italian Food', value: 'Italian Food'},
    {label: 'Thai', value: 'Thai'},
  ]);
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

  const [index,setIndex] = React.useState(0);
  useEffect(() => {
    getCategoryOfSupplier();
  }, []);

  const deleteItem = async () => {
    console.log(selected);
    let TruckId = await AsyncStorage.getItem('TruckID');
    let copiedData = [...Data];
    copiedData.splice(selected, 1);
    axios
      .post(url + '/api/supplier/updatecategory', {
        _id: TruckId,
        categoryArrays: copiedData,
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
  };

  const UpdateCategory = async val => {
    let indexCategory = index;
    let CopyData =[...Data];
    CopyData[indexCategory] = EditCategory;

    setIndicator(true);
    let TruckId = await AsyncStorage.getItem('TruckID');
    axios
      .post(url + '/api/supplier/updatecategory', {
        _id: TruckId,
        categoryArrays: CopyData,
      })
      .then(async Response => {
        const ERROR = Response.data.code;
        if (ERROR === 'ABT0000') {
          console.log('Updated');
          setShowModal(false)
          setIndicator(false);
          getCategoryOfSupplier();
          setTimeout(() => {
            setShowModal(false)
          }, 500);
        } else {
          setIndicator(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
    if (val) setShowModal2(false);
  };
  const AddCategory = async(array)=>{
    console.log('ADDD A')
    setIndicator(true);
    let TruckId = await AsyncStorage.getItem('TruckID');
    axios
      .post(url + '/api/supplier/updateCategory', {
        _id: TruckId,
        categoryArrays: array,
      })
      .then(async Response => {
        const ERROR = Response.data.code;
        if (ERROR === 'ABT0000') {
          console.log('Updated');
          setShowModal(false)
          setIndicator(false);
          setTimeout(() => {
            setShowModal(false)
          }, 500);
        } else {
          setIndicator(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
    // if (val) setShowModal2(false);
  }
  const getCategoryOfSupplier = async () => {
    setIndicator(true);
    let TruckId = await AsyncStorage.getItem('TruckID');
    axios
      .post(url + '/api/supplier/getcategory', {
        _id: TruckId,
      })
      .then(async Response => {
        const ERROR = Response.data.code;
        console.log('Ctageogory',Response.data)
        if (ERROR !== 'ABT0001') {
          setIndicator(false);
          setData(Response.data);
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
          value={item}
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
          onPress={() => {
            setShowModal(true);
            setEditCategory(item);
            setIndex(index);
          }}
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
            setDeleteModal(true);
          }}
        />
      </View>
    </TouchableOpacity>
  );
  const AddToList = () => {
    console.log('hjhjb')
    let newId = 0;
    let newArray = [...Data];
    if (!name.value) {
      setName({value: null, Error: true, ErrorText: 'Name is required.'});
    }
    // if (!description.value) {
    //   setDescription({
    //     value: null,
    //     Error: true,
    //     ErrorText: 'Description is required.',
    //   });
    // }
    // if (!price.value) {
    //   setPrice({value: null, Error: true, ErrorText: 'Price is required.'});
    // } else
    
    if (name.value) {
      newArray.push({
        name: name.value,
        // price: price.value,
        // description: description.value,
        // category: SelectedValue,
      });
      setData(newArray);
      AddCategory(newArray);
    }
  };
  const changeCategory = e => {
    if (e === '') {
      setCategory(null);
    } else if (e) {
      setCategory(e);
      console.log('Category is here', e);
    }
  };
  return (
    <SafeAreaView style={styles.parent}>
      <Header
        Add
        onAddPress={() => setAddItem(true)}
        isHome
        onPress={() => navigation.openDrawer()}>
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
      <AddItemModal
        ModalContainer={{
          paddingVertical: responsiveHeight(2),
          paddingHorizontal: responsiveWidth(2),
        }}
        showModal={addItem}>
        {/* <View style={{height: responsiveHeight(33),paddingVertical:responsiveHeight(2),paddingHorizontal:responsiveWidth(2)}}> */}
        {/* <ScrollView> */}
        <View
          style={[
            styles.CrossView,
            {alignSelf: 'flex-end', marginRight: responsiveWidth(2)},
          ]}>
          <Entypo
            name={'circle-with-cross'}
            color={'black'}
            size={responsiveFontSize(3.2)}
            onPress={() => setAddItem(false)}
          />
        </View>
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Input
            rounded
            placeholder="Name"
            onChangeText={e =>
              setName({value: e, Error: false, ErrorText: null})
            }
            value={name.value}
            style={{width:'100%'}}
          />
          {name.Error ? <ErrorView>{name.ErrorText}</ErrorView> : null}
          {/* <Select
            itemList={Categories}
            value={SelectedValue}
            onChange={e => setSelectedValue(e)}
            containerStyle={{width: '100%'}}
            style={[styles.Input, {width: '100%'}]}
          /> */}
          {/* <TouchableOpacity
            onPress={() => setShowModalAddCategory(true)}
            style={{left: responsiveWidth(7)}}>
            <AntDesign
              name={'pluscircle'}
              color={'rgb(193, 32, 38)'}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity> */}
        </View>

        {/* <Input
          rounded
          placeholder="Name"
          onChangeText={e => setName({value: e, Error: false, ErrorText: null})}
          value={name.value}
          style={[styles.Input, {marginTop: responsiveHeight(3), width: '90%'}]}
        />
        {name.Error ? <ErrorView>{name.ErrorText}</ErrorView> : null}
        <Input
          rounded
          placeholder="Description"
          onChangeText={e =>
            setDescription({value: e, Error: false, ErrorText: null})
          }
          value={description.value}
          style={[styles.Input, {marginTop: responsiveHeight(3), width: '90%'}]}
        />
        {description.Error ? (
          <ErrorView>{description.ErrorText}</ErrorView>
        ) : null}
        <Input
          rounded
          placeholder="Price"
          keyboardType={'number-pad'}
          onChangeText={e =>
            setPrice({value: e, Error: false, ErrorText: null})
          }
          value={price.value}
          style={[styles.Input, {marginTop: responsiveHeight(3), width: '90%'}]}
        />
        {price.Error ? <ErrorView>{price.ErrorText}</ErrorView> : null} */}
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
      <Modal showModal={showModalAddCatgory}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            paddingVertical: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(2),
            borderRadius: 8,
          }}>
          <View
            style={[
              styles.CrossView,
              {alignSelf: 'flex-end', marginRight: responsiveWidth(2)},
            ]}>
            <Entypo
              name={'circle-with-cross'}
              color={'black'}
              size={responsiveFontSize(3.2)}
              onPress={() => setShowModalAddCategory(false)}
            />
          </View>
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
            onPress={() => setShowModalAddCategory(true)}
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
            value={EditCategory}
            onChangeText={val => setEditCategory(val)}
            placeholder="Edit Category here"
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: responsiveHeight(2),
            }}
          />
          <Button
            onPress={() => UpdateCategory()}
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
  TextView: {
    height: responsiveHeight(10),
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '28%',
    height: responsiveHeight(5),
    borderRadius: 8,
    alignSelf: 'center',
  },
});

export default ItemCategory;
