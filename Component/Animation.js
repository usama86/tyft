import PropTypes from "prop-types";
import React from 'react';
import {TouchableWithoutFeedback,Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
const Animation =({animations, children,container, ...props})=>{
  //handleViewRef = ref => this.view = ref;

//   state={
//       animation:'zoomInDown'
//   }

//   componentDidMount =()=> {
    // setTimeout(() => {
    //   this.setState({animation:'zoomOutDown'})
    // }, 2000); // amount of time the splash is shown from the time component is rendered
//   }
  //zoomOutDown

//   componentDidMount=()=>{
//     this.bounce();
//   }
//   bounce = () => this.view.bounce(5000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
  
  
    return (
      <TouchableWithoutFeedback>
        <Animatable.View  style={container} animation={animations} easing="ease-out" {...props}>
            {children}      
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
}

Animation.propTypes = {
  animations: PropTypes.string,
  children: PropTypes.array,
  container: PropTypes.object
}
Animation.defaultProps ={
  animation:'zoomInDown',
  children:<Text>Hellllllllo</Text>,
  container:{
    flex: 1, 
    marginTop:responsiveHeight(6),
    marginHorizontal:responsiveWidth(20),
  },
}

export default Animation;