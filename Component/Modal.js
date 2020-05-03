import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';
const Modals = ({ModalContainer, showModal, children}) => {
  return (
    <Modal
      isVisible={showModal}
      backdropColor="rgba(0,0,0,0.8)"
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={[Styles.container, ModalContainer]}>{children}</View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf:'center',
    borderRadius:8
  },
});
export default Modals;
