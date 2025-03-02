import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Text from './Text';
import {Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Container from './Container';
import Button from './Button';
const Ui = ({
  isLoading,
  TextValue,
  TextViewStyle,
  TextStyle,
  ContainerStyle,
  children,
  ContentStyle,
  FooterStyle,
  ButtonText,
  TextSpace,
  onPressButton,
  TextShow,
  buttonStyle,
  noShowButton,
  noScroll,
  // HeaderValue
}) => {
  return (
    <Container
      noScroll={noScroll}
      ContentStyle={[styles.container, ContainerStyle]}>
      {TextShow ? (
        <View style={[styles.TextView, TextViewStyle]}>
          <Text bold value={TextValue} style={[styles.text, {TextStyle}]} />
        </View>
      ) : null}
      <View style={[styles.Content, ContentStyle]}>{children}</View>
      {noShowButton ? null : isLoading ? (
        <View style={[styles.buttonStyle2, buttonStyle, {borderRadius: 33}]}>
          <ActivityIndicator color={'#fff'} size={'large'} />
        </View>
      ) : (
        <Button
          style={[styles.buttonStyle2, buttonStyle]}
          onPress={onPressButton}
          rounded>
          <Text
            uppercase={false}
            style={[styles.TextStyle1, TextSpace]}
            value={ButtonText}
          />
        </Button>
      )}
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: responsiveHeight(7),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextView: {
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
  },
  TextStyle1: {
    color: 'white',
  },
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  Input: {
    marginTop: responsiveHeight(3),
  },
  radioView: {
    marginLeft: responsiveWidth(15),
    flexDirection: 'row',
  },
  Content: {
    height: responsiveHeight(65),
  },
  buttonStyle2: {
    backgroundColor: 'rgb(193, 32, 38)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: responsiveHeight(6),
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'rgb(0, 0, 0)'
  },
  logoStyle1: {
    height: responsiveHeight(4),
    width: responsiveWidth(7),
    resizeMode: 'contain',
    marginLeft: responsiveWidth(3),
  },
  footer: {
    marginTop: responsiveHeight(2),
  },
});

Ui.defaultProps = {
  TextShow: true,
  isLoading: false,
};
export default Ui;
