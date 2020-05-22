import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {TouchableWithoutFeedback, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const Animation = ({
  animationsIn,
  animationOut,
  children,
  container,
  navigation,
  ...props
}) => {
  const [animate, SetAnimate] = React.useState(animationsIn);
  React.useEffect(()=>{
    if(animationOut)
      SetAnimate(animationOut);
  },[animationOut])
  return (
    <Animatable.View
      style={container}
      animation={animate}
      easing="ease-out"
      {...props}>
      {children}
    </Animatable.View>
  );
};

Animation.propTypes = {
  animationsIn: PropTypes.string,
  animationOut: PropTypes.string,
  children: PropTypes.object,
  container: PropTypes.object,
}; 
Animation.defaultProps = {
  animationsIn: 'zoomInDown',
  animationOut: '',
  children: <Text>Hellllllllo</Text>,
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
};

export default Animation;
