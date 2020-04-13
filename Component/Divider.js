import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  divider: {
    height: 20,
  },
});

const Divider = props => {
  const { height } = props;
  return (
    <View style={[styles.divider, height ? { height } : null]} {...props} />
  );
};

export default Divider;
