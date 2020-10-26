import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import theme from '../theme';
// import {black, inputText, red, url, green} from '../../Globals/globals';
class SignUp extends Component {
  state = {
    TextInputs: [
      {
        id: 1,
        placeholder: 'Current password',
        value: '',
        Error: false,
        ExtraText: '',
      },
      {
        id: 2,
        placeholder: 'New password',
        value: '',
        Error: false,
        ExtraText: '',
      },
      {
        id: 3,
        placeholder: 'Confirm new password',
        value: '',
        Error: false,
        ExtraText: '',
      },
    ],
    CurrentPassword: '',
    NewPassword: '',
    ConfirmNewPassword: '',
    loading: false,
    showModal: false,
    ID: null,
  };

  changeValue = (val, index) => {
    let Password = /^(?=.*\d).{8,100}$/;
    let newArr = [...this.state.TextInputs];
    newArr[index].value = val;
    newArr[index].Error = false;
    newArr[index].ExtraText = '';
    this.setState({TextInputs: newArr});
    {
      index === 0
        ? this.setState({CurrentPassword: val})
        : index === 1
        ? this.setState({NewPassword: val}, () => {
            if (Password.test(val)) {
              let DuplicateArray = [...this.state.TextInputs];
              DuplicateArray[index].Error = false;
              DuplicateArray[index].ExtraText = '';
              this.setState({TextInputs: DuplicateArray});
            } else if (val === '') {
              let DuplicateArray = [...this.state.TextInputs];
              DuplicateArray[index].Error = false;
              DuplicateArray[index].ExtraText = '';
              this.setState({TextInputs: DuplicateArray});
            } else {
              {
                let DuplicateArray = [...this.state.TextInputs];
                DuplicateArray[index].Error = true;
                DuplicateArray[index].ExtraText =
                  'Password must be atleast 8 digits long and include atleast one numeric digit';
                this.setState({TextInputs: DuplicateArray});
              }
            }
          })
        : index === 2
        ? this.setState({ConfirmNewPassword: val})
        : null;
    }
  };

  Divider = () => <View style={Styles.line} />;
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() => Keyboard.dismiss()}>
          {/* <Header
            Signout={this.state.ID}
            onPressSignOut={() => this.setState({showModal: true})}
            isHome>
            {'Change Password'}
          </Header> */}
          <View
            style={{
              flex: 1,
              marginTop: responsiveHeight(2),
            }}>
            <ScrollView>
              <View style={Styles.MainTextViewContainer}>
                {this.state.TextInputs.map((item, index) => (
                  <View style={{width: '100%'}}>
                    <View style={Styles.PlaceholderView}>
                      <Text
                        style={[
                          Styles.SmallText,
                          {
                            fontSize: responsiveFontSize(1.6),
                            color: 'black',
                            fontWeight: 'bold',
                          },
                        ]}>
                        {item.placeholder}
                      </Text>
                    </View>

                    <View style={Styles.inputView}>
                      <TextInput
                        placeholder={item.placeholder}
                        style={[Styles.TextInput]}
                        value={item.value}
                        secureTextEntry={true}
                        onChangeText={val => {
                          this.changeValue(val, index);
                        }}
                      />
                    </View>
                    {item.Error ? (
                      <Text
                        style={[
                          Styles.SmallText,
                          {
                            fontSize: responsiveFontSize(1.6),
                            color: 'red',
                            marginTop: responsiveHeight(1),
                          },
                        ]}>
                        {item.ExtraText}
                      </Text>
                    ) : null}
                  </View>
                ))}
              </View>

              <View style={Styles.ButtonView}>
                {this.state.loading ? (
                  <View style={Styles.ButtonTouch}>
                    <ActivityIndicator color={'white'} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.SaveChanges();
                    }}
                    style={Styles.ButtonTouch}>
                    <Text
                      style={[
                        Styles.SmallText,
                        {
                          color: 'white',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                        },
                      ]}>
                      {'Save'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: responsiveHeight(10),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
    marginTop: responsiveHeight(2),
  },
  headerText: {
    color: 'black',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  SmallText: {
    color: 'black',
    fontSize: responsiveFontSize(1.8),
  },
  SocialAccountTextView: {
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexView: {
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: responsiveHeight(3),
  },
  line: {
    marginTop: responsiveHeight(4),
    width: '100%',
    height: responsiveHeight(1.5),
    backgroundColor: 'rgb(250,250,250)',
  },
  MainTextViewContainer: {
    // marginTop: responsiveHeight(2),
    width: '80%',
    // height: responsiveHeight(40),
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextInput: {
    padding: 0,
    margin: 0,
    fontSize: responsiveFontSize(1.6),
    color: 'grey',
    height: responsiveHeight(5),
    paddingLeft: responsiveWidth(3),
    width: '100%',
  },
  inputView: {
    borderRadius: responsiveWidth(2),
    width: '100%',
    height: responsiveHeight(5),
    borderColor: 'black',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  ButtonView: {
    height: responsiveHeight(50),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: responsiveHeight(5),
  },
  ButtonTouch: {
    width: '80%',
    alignSelf: 'center',
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
  PlaceholderView: {
    height: responsiveHeight(6),
    justifyContent: 'center',
    width: '100%',
  },
  CrossView: {
    position: 'absolute',
    top: responsiveHeight(5.1),
    left: '7%',
    bottom: 0,
  },
  NoData: {
    marginTop: responsiveHeight(30),
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    width: '70%',
    fontWeight: 'bold',
  },
});

export default SignUp
