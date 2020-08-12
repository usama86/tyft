// import React, {useEffect} from 'react';
// import {View, StyleSheet, Image, Alert} from 'react-native';
// import Input from '../../../Component/Input';
// import Text from '../../../Component/Text';
// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize,
// } from 'react-native-responsive-dimensions';
// import Radio from '../../../Component/Radio';
// import Ui from '../../../Component/Ui';
// import Header from '../../../Component/Header';
// import Button from '../../../Component/Button';
// import AsyncStorage from '@react-native-community/async-storage';
// import theme from '../../theme';
// import * as Route from '../../../Constants/RouteName';
// import url from '../Constants/constants';
// import axios from 'axios';
// import Modal from '../../../Component/Modal';
// import {CommonActions} from '@react-navigation/native';
// const Profile = ({navigation, route}) => {
//   const [name, SetName] = React.useState({value: null, errorText: null});
//   const [email, setEmail] = React.useState({value: null, errorText: null});
//   const [phone, setPhone] = React.useState({value: null, errorText: null});
//   const [password, setPassword] = React.useState({
//     value: null,
//     errorText: null,
//   });
//   const [confirmPassword, setConfirmPassword] = React.useState({
//     value: null,
//     errorText: null,
//   });
//   const [Language, setLanguage] = React.useState('English');
//   const [isLoading, setisLoading] = React.useState(false);
//   const [update, setUpdated] = React.useState(null);
//   useEffect(() => {
//     SetName({value: route.params.UserData[0].profileName, errorText: null});
//     setEmail({value: route.params.UserData[0].email, errorText: null});
//     setPhone({value: route.params.UserData[0].phoneNumber, errorText: null});
//   }, []);
//   const updateUser = async () => {
//     if (!name.value) {
//       SetName({value: null, errorText: 'Please Enter Name.'});
//     }
//     if (!email.value) {
//       setEmail({value: null, errorText: 'Please Enter Email'});
//     }
//     if (!password.value) {
//       setPassword({value: null, errorText: 'Please Enter Password'});
//     }
//     if (!phone.value) {
//       setPhone({value: null, errorText: 'Please Enter Phone Number'});
//     }
//     if (password.value !== confirmPassword.value) {
//       setConfirmPassword({
//         value: confirmPassword.value,
//         errorText: 'Confirm Password Does not matched with current Password',
//       });
//     } else if (name.value && email.value && password.value && phone.value) {
//       await setisLoading(true);
//       let userID = await AsyncStorage.getItem('userID');
//       axios
//         .post(url + '/api/users/updateuser', {
//           _id: userID,
//           email: email.value,
//           password: password.value,
//           profileName: name.value,
//           phoneNumber: phone.value,
//           // userType: 'Supplier',
//           // Language: Language,
//         })
//         .then(async Response => {
//           console.log('Responsessss', Response.data.code);
//           let Code = Response.data.code;
//           if (Code === 'ABT0000') {
//             setisLoading(false);
//             console.log('Supplier Updated');
//             setUpdated(true);
//             setTimeout(() => {
//               setUpdated(false);
//             }, 500);
//             // navigation.navigate(Route.SIGNIN);
//           } else {
//             console.log('NOT ADDEED');
//             setisLoading(false);
//           }
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }
//   };
//   const changeEmail = e => {
//     let EmailRegix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (EmailRegix.test(e)) {
//       setEmail({value: e, errorText: null});
//     } else if (e == '') {
//       setEmail({value: e, errorText: null});
//     } else if (!EmailRegix.test(e)) {
//       setEmail({value: e, errorText: 'Please Enter Valid Email'});
//     }
//   };
//   const changePassword = e => {
//     let PasswordRegix = /^(?=.*\d).{8,100}$/;
//     if (PasswordRegix.test(e)) {
//       setPassword({value: e, errorText: null});
//     } else if (e === '') {
//       setPassword({value: e, errorText: null});
//     } else if (!PasswordRegix.test(e)) {
//       setPassword({
//         value: e,
//         errorText:
//           'Password must be atleast 8 digits long and include atleast one numeric digit',
//       });
//     }
//   };
//   return (
//     <View style={{height: '100%', width: '100%'}}>
//       <Header onPress={()=>navigation.openDrawer()} isHome>{'Profile'}</Header>
//       <Ui
//         onPressButton={updateUser}
//         isLoading={isLoading}
//         TextValue={'Update Your Account'}
//         ButtonText={'Done'}
//         ContentStyle={{height: responsiveHeight(70)}}
//         TextSpace={styles.TextSpace}
//         TextViewStyle={styles.TextViewStyle}>
//         <View style={styles.InputMainView}>
//           <Input
//             rounded
//             placeholder="Name"
//             onChangeText={e => SetName({value: e, errorText: null})}
//             value={name.value}
//             style={styles.Input}
//             errorText={name.errorText ? name.errorText : null}
//           />
//           <Input
//             rounded
//             placeholder="Email Address"
//             keyboardType={'email-address'}
//             value={email.value}
//             onChangeText={e => changeEmail(e)}
//             errorText={email.errorText ? email.errorText : null}
//             style={styles.Input}
//           />
//           <Input
//             rounded
//             placeholder="Cell Phone"
//             keyboardType={'phone-pad'}
//             onChangeText={e => setPhone({value: e, errorText: null})}
//             value={phone.value}
//             errorText={phone.errorText ? phone.errorText : null}
//             style={styles.Input}
//           />
//           <Input
//             rounded
//             placeholder="Password"
//             onChangeText={e => changePassword(e)}
//             value={password.value}
//             errorText={password.errorText ? password.errorText : null}
//             style={styles.Input}
//           />
//           <Input
//             rounded
//             value={confirmPassword.value}
//             onChangeText={e => setConfirmPassword({value: e, errorText: null})}
//             errorText={
//               confirmPassword.errorText ? confirmPassword.errorText : null
//             }
//             placeholder="Re-enter Password"
//             style={styles.Input}
//           />
//         </View>

//         {/* <View style={styles.radioView}>
//           <Radio
//             selected={'English' ? true : false}
//             onPress={e => {
//               setLanguage('English');
//             }}
//           />
//           <Text value={'English'} style={{marginLeft: responsiveWidth(2)}} />

//           <Radio
//             selected={Language === 'Spanish' ? true : false}
//             onPress={() => {
//               setLanguage('Spanish');
//             }}
//             style={{marginLeft: responsiveWidth(8)}}
//           />
//           <Text value={'Spanish'} style={{marginLeft: responsiveWidth(2)}} />
//         </View> */}
//         <Modal ModalContainer={styles.modalView} showModal={update}>
//           <View style={styles.IconView}>
//             <Image
//               style={{width: '100%', height: '100%', resizeMode: 'contain'}}
//               source={require('../../../images/button.png')}
//             />
//           </View>
//           <Text style={styles.UpdatedText}>{'Updated'}</Text>
//         </Modal>
//       </Ui>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   InputMainView: {
//     marginVertical: responsiveHeight(2),
//   },
//   TextViewStyle: {
//     // width: responsiveWidth(60)
//   },
//   Input: {
//     marginTop: responsiveHeight(3),
//   },
//   radioView: {
//     marginLeft: responsiveWidth(15),
//     marginTop: responsiveHeight(5),
//     flexDirection: 'row',
//   },
//   TextSpace: {
//     // paddingLeft:responsiveWidth(18)
//   },
//   button: {
//     width: responsiveWidth(50),
//     height: responsiveHeight(5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: theme.colors.primary,
//     borderRadius: 8,
//     marginLeft: responsiveWidth(5),
//   },
//   IconView: {
//     width: '90%',
//     alignSelf: 'center',
//     height: responsiveHeight(20),
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: responsiveHeight(2),
//   },
//   UpdatedText: {
//     fontWeight: 'bold',
//     fontSize: responsiveFontSize(2.5),
//     color: '#1AB975',
//     textAlign: 'center',
//   },
//   modalView: {
//     paddingVertical: responsiveHeight(3),
//   },
// });
// export default Profile;

import React from 'react';
import {View, StyleSheet,Alert} from 'react-native';
import Input from '../../../Component/Input';
import Text from '../../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Checkbox from '../../../Component/Checkbox';
import Ui from '../../../Component/Ui';
import * as RouteName from './../../../Constants/RouteName';
import Header from '../../../Component/Header';
import ErrorView from '../../../Component/ErrorField';
import axios from 'axios';

const TruckInfo = ({navigation, route}) => {
  const [check, SetCheck] = React.useState(false);
  const [truckName, SetTruckName] = React.useState({
    name: null,
    Error: false,
    ErrorText: null,
  });
  const [businessDesc, setBusinessDesc] = React.useState({
    description: null,
    Error: false,
    ErrorText: null,
  });
  const [contact, setContact] = React.useState({
    contact: null,
    Error: null,
    ErrorText: null,
  });
  const [email, setEmail] = React.useState({
    email: null,
    Error: null,
    ErrorText: null,
  });
  const [city, setCity] = React.useState({
    city: null,
    Error: null,
    ErrorText: null,
  });
  const [website, setWebsite] = React.useState({
    website: null,
    Error: null,
    ErrorText: null,
  });


  React.useEffect(()=>{
    if(route.params.truckData)
    {
    SetTruckName({name:route.params.truckData[0].truckName,ErrorText:null})
    setBusinessDesc({description:route.params.truckData[0].businessDesc,ErrorText:null})
    setContact({contact:route.params.truckData[0].truckContact,ErrorText:null})
    setEmail({email:route.params.truckData[0].truckEmail,ErrorText:null})
    setCity({city:route.params.truckData[0].truckCity,ErrorText:null})
    setWebsite({website:route.params.truckData[0].truckWebsite,ErrorText:null})
    }
  },[])

  const changeInputHandler = () => {
    SetCheck(!check);
  };
  const changeEmail = e => {
    let EmailRegix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (EmailRegix.test(e)) {
      setEmail({email: e, Error: false, ErrorText: null});
    } else if (e === '') {
      setEmail({email: e, Error: false, ErrorText: null});
    } else if (!EmailRegix.test(e)) {
      setEmail({email: e, Error: true, ErrorText: 'Please Enter Valid Email'});
    }
  };
  const Navigate =async () => {
    let TruckId = await AsyncStorage.getItem('TruckID');

    axios
      .post(url + '/api/supplier/updatetruckinfo', {
        _id: TruckId,
        truckName:truckName.name,
        businessDesc:businessDesc.businessDesc,
        truckContact:contact.contact,
        truckEmail:email.email,
        truckCity:city.city,
        truckWebsite:website.website,
      })
      .then(async Response => {
        console.log(Response);
        const ERROR = Response.data.code;
        if (ERROR === 'ABT0000') {
          console.log('Updated');
          Alert.alert('Truck Data Updated Successfully.');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      <Header isHome onPress={() => navigation.openDrawer()}>
        {'Truck Info'}
      </Header>
      <Ui
        TextViewStyle={styles.TextViewStyle}
        TextValue={"Your food truck's info"}
        ButtonText={'Done'}
        ContentStyle={{height: null}}
        buttonStyle={{marginVertical: responsiveHeight(1)}}
        onPressButton={Navigate}>
        <View style={styles.InputMainView}>
          <Input
            rounded
            placeholder="Truck Name"
            onChangeText={e =>
              SetTruckName({name: e, Error: false, ErrorText: null})
            }
            value={truckName}
            style={styles.Input}
          />
          {truckName.Error ? (
            <ErrorView>{truckName.ErrorText}</ErrorView>
          ) : null}
          <Input
            rounded
            placeholder="Business Description"
            multiline={true}
            value={businessDesc}
            onChangeText={e =>
              setBusinessDesc({description: e, Error: false, ErrorText: null})
            }
            style={
      
              {
                height: responsiveHeight(19),
                marginTop: responsiveHeight(2),
                width: '100%',
              }
            }
          />
          {businessDesc.Error ? (
            <ErrorView>{businessDesc.ErrorText}</ErrorView>
          ) : null}
          <Input
            rounded
            placeholder="Contact"
            style={styles.Input}
            value={contact}
            onChangeText={e =>
              setContact({contact: e, Error: false, ErrorText: null})
            }
          />
          {contact.Error ? <ErrorView>{contact.ErrorText}</ErrorView> : null}
          <Input
            rounded
            placeholder="Email"
            onChangeText={e => changeEmail(e)}
            value={email}
            style={styles.Input}
          />
          {email.Error ? <ErrorView>{email.ErrorText}</ErrorView> : null}
          <Input
            rounded
            placeholder="City"
            onChangeText={e =>
              setCity({city: e, Error: false, ErrorText: null})
            }
            value={city}
            style={styles.Input}
          />
          {city.Error ? <ErrorView>{city.ErrorText}</ErrorView> : null}
          <Input
            rounded
            placeholder="Website"
            onChangeText={e =>
              setWebsite({website: e, Error: false, ErrorText: null})
            }
            value={website}
            style={styles.Input}
          />
          {website.Error ? <ErrorView>{website.ErrorText}</ErrorView> : null}
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
  },
  radioView: {
    flexDirection: 'row',
  },
});
export default TruckInfo;
