import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {View, SafeAreaView, StyleSheet,ScrollView} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';
const Modals = ({ModalContainer, showModal, children,...props}) => {
  return (
    <Modal
      isVisible={showModal}
      backdropColor="rgba(0,0,0,0.8)"
      animationIn="zoomInDown"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      style={{overflow:'scroll'}}
      {...props}
      >
      {/* <ScrollView> */}
        <View style={[Styles.container, ModalContainer]}>{children}</View>
      {/* </ScrollView> */}
    </Modal>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf:'center',
    borderRadius:8,
  },
});
export default Modals;
