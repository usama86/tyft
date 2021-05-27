import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, SafeAreaView, View, ScrollView} from 'react-native';
import {Container, Content} from 'native-base';
import {responsiveHeight} from 'react-native-responsive-dimensions/lib/commonjs';

const tyftContainer = ({containerStyle, ContentStyle, noScroll, ...props}) => {
  const {container, content} = styles;
  return (
    <SafeAreaView {...props} style={[container, containerStyle]}>
      <View style={{flex: 1}}>
        {noScroll ? (
          <View style={[content, ContentStyle]}>{props.children}</View>
        ) : (
          <ScrollView
            contentContainerStyle={{paddingBottom: responsiveHeight(5)}}>
            <View style={[content, ContentStyle]}>{props.children}</View>
          </ScrollView>
        )}
      </View>
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
