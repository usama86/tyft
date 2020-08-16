import React from 'react';
import {View, StyleSheet} from 'react-native';
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
  const Navigate = () => {
    if (!truckName.name) {
      SetTruckName({
        name: null,
        Error: true,
        ErrorText: 'Truck Name must not be empty',
      });
    }
    if (!businessDesc.description) {
      setBusinessDesc({
        description: null,
        Error: true,
        ErrorText: 'Business Description must not be empty',
      });
    }
    if (!contact.contact) {
      setContact({
        contact: null,
        Error: true,
        ErrorText: 'Contact number must not be empty',
      });
    }
    if (!email.email) {
      setEmail({
        email: null,
        Error: true,
        ErrorText: 'Email must not be empty',
      });
    }
    if (!city.city) {
      setCity({
        city: null,
        Error: true,
        ErrorText: 'City name must not be empty',
      });
    }
    if (!website.website) {
      setWebsite({
        website: null,
        Error: true,
        ErrorText: 'Website must not be empty',
      });
    } else if (
      truckName.name &&
      businessDesc.description &&
      contact.contact &&
      email.email &&
      !email.Error &&
      city.city &&
      website.website
    ) {
      navigation.navigate(RouteName.BUSINESSHOUR, {
        Name: route.params.Name,
        Email: route.params.Email,
        Phone: route.params.Phone,
        Password: route.params.Password,
        TruckLogo: route.params.TruckLogo,
        TruckName: truckName.name,
        BusinessDescription: businessDesc.description,
        TruckContact: contact.contact,
        TruckEmail: email.email,
        City: city.city,
        Website: website.website,
      });
    }
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      <Header onPress={() => navigation.goBack()}>{'Truck Info'}</Header>
      <Ui
        TextViewStyle={styles.TextViewStyle}
        TextValue={"Your food truck's info"}
        ButtonText={'Next'}
        ContentStyle={{height: null,paddingBottom:responsiveHeight(3)}}
        buttonStyle={{marginBottom:responsiveHeight(2)}}
        onPressButton={Navigate}>
        <View style={styles.InputMainView}>
          <Input
            rounded
            placeholder="Truck Name"
            onChangeText={e =>
              SetTruckName({name: e, Error: false, ErrorText: null})
            }
            value={truckName.name}
            style={styles.Input}
          />
          {truckName.Error ? (
            <ErrorView>{truckName.ErrorText}</ErrorView>
          ) : null}

          <Input
            rounded
            placeholder="Business Description"
            multiline={true}
            value={businessDesc.description}
            onChangeText={e =>
              setBusinessDesc({description: e, Error: false, ErrorText: null})
            }
            style={
              // styles.Input,
              {
                height: responsiveHeight(19),
                marginTop: responsiveHeight(2),
                width: '90%',
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
            value={contact.contact}
            onChangeText={e =>
              setContact({contact: e, Error: false, ErrorText: null})
            }
          />
          {contact.Error ? <ErrorView>{contact.ErrorText}</ErrorView> : null}
          <Input
            rounded
            placeholder="Email"
            onChangeText={e => changeEmail(e)}
            value={email.email}
            style={styles.Input}
          />
          {email.Error ? <ErrorView>{email.ErrorText}</ErrorView> : null}
          <Input
            rounded
            placeholder="City"
            onChangeText={e =>
              setCity({city: e, Error: false, ErrorText: null})
            }
            value={city.city}
            style={styles.Input}
          />
          {city.Error ? <ErrorView>{city.ErrorText}</ErrorView> : null}
          <Input
            rounded
            placeholder="Website"
            onChangeText={e =>
              setWebsite({website: e, Error: false, ErrorText: null})
            }
            value={website.website}
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
