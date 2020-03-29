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
const ImagePickers = () => {
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
      }
    });
  };
  return (
    <View style={styles.MainView}>
      <TouchableHighlight onPress={SelectImage} style={styles.HighLight}>
        <Image
          source={receivedImage ? {uri: img} : require('./../images/add.png')}
          style={styles.Image}
        />
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
});

export default ImagePickers;
