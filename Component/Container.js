import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {Container, Content} from 'native-base';

const tyftContainer = ({containerStyle, ContentStyle, ...props}) => {
  const {container, content} = styles;
  return (
    <SafeAreaView {...props} style={[container, containerStyle]}>
      <View style={[content, ContentStyle]}>{props.children}</View>
    </SafeAreaView>
  );
};

Container.propTypes = {
  children: PropTypes.any,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {},
});

export default tyftContainer;
