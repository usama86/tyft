import PropTypes from "prop-types";
import React from 'react';
import {
    StyleSheet,
    View,
  } from 'react-native';
import Button from './Button';
import Text from './Text';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import theme from './../Screens/theme';
const CountButton =({button,tabProp,buttonProp})=>{
    return(
        <View style={[styles.TabView,tabProp]}>
        {button.map((item, index) => (
          <>
            {index < 2 ? (
              <Button style={[styles.Button,buttonProp]}>
                <Text style={styles.Btntext} value={'Mexican'} />
              </Button>
            ) : null}
          </>
        ))}
        <Button style={[styles.Button, {backgroundColor: theme.colors.primary,width:responsiveWidth(20)},buttonProp]}>
          <Text
            style={[styles.Btntext, {color: 'white',fontWeight:'bold',fontSize:responsiveFontSize(2)}]}
            value={'+ ' + (button.length - 2)}
          />
        </Button>
      </View>
    )
}

CountButton.propTypes = {
  button: PropTypes.array
}
CountButton.defaultProps={
    button:[1, 2, 3, 4, 5, 6, 7, 8]
    
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: '100%',
    },
    TabView: {
      height: responsiveHeight(7),
      width: '95%',
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'absolute',
      top: responsiveHeight(19.5),
    },
    Button: {
      width: responsiveWidth(24),
      height:responsiveHeight(4),
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      elevation: 5,
    },
    Btntext: {
      color: 'white',
    },

  
    
  });
export default CountButton;