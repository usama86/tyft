import PropTypes from 'prop-types';
import React from 'react';
import {ListItem, CheckBox, Body} from 'native-base';
import Text from './Text';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-picker';
const ImagePickers = ({SendUri}) => {
  const [receivedImage, setReceivedImage] = React.useState(false);
  const [img, setImage] = React.useState('');
  const SelectImage = () => {
    const options = {
      title: 'Select or Capture Your Front Pose Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const img = response.uri;
        setImage(img);
        setReceivedImage(true);
        SendUri(img);
      }
    });
  };
  return receivedImage ? (
    <TouchableHighlight
      underlayColor={'rgba(0,0,0,0.1)'}
      onPress={SelectImage}
      style={styles.SelectedMainView}>
        <Image source={{uri:img}} style={styles.SelectedImageStyle} />
      </TouchableHighlight>
  ) : (
    <View style={styles.MainView}>
      <TouchableHighlight
        underlayColor={'rgba(0,0,0,0.1)'}
        onPress={SelectImage,SendUri}
        style={styles.HighLight}>
        <Image source={require('./../images/add.png')} style={styles.Image} />
      </TouchableHighlight>
      <View style={styles.TextView}>
        <Text value={'Add Logo Photo'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainView: {
    marginTop: responsiveHeight(14),
    width: responsiveWidth(60),
    height: responsiveHeight(20),
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#C3CDCE',
    borderWidth: 1,
    borderColor: 'black',
  },
  SelectedMainView: {
    marginTop: responsiveHeight(14),
    width: responsiveWidth(60),
    height: responsiveHeight(20),
    borderRadius: 20,
    alignSelf: 'center',
  },
  HighLight: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: responsiveHeight(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    resizeMode: 'contain',
  },
  TextView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectedImageStyle:{
    width:'100%',
    height:'100%',
    borderRadius:20,
    resizeMode:'contain'
  }
});

export default ImagePickers;
