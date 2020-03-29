import PropTypes from 'prop-types';
import React from 'react';
import {TouchableWithoutFeedback, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const Animation = ({animations, children, container, ...props}) => {
  return (
    <Animatable.View
      style={container}
      animation={animations}
      easing="ease-out"
      {...props}>
      {children}
    </Animatable.View>
  );
};

Animation.propTypes = {
  animations: PropTypes.string,
  children: PropTypes.object,
  container: PropTypes.object,
};
Animation.defaultProps = {
  animation: 'zoomInDown',
  children: <Text>Hellllllllo</Text>,
  container: {
    width: '100%',
    height: '100%',
    backgroundColor:'#fff'
  },
};

export default Animation;
