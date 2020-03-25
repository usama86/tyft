import React from 'react';
import {TouchableWithoutFeedback,Text,StyleSheet,View,Image} from 'react-native';
import {responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import Animation from './../Component/Animation';
const SplashScreen =()=>{
  //handleViewRef = ref => this.view = ref;

//   state={
//       animation:'zoomInDown'
//   }
  const [animations,setAnimation]=React.useState('zoomInDown');

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
              <Animation container={styles.container} animations={animations}>
                    <View>
                        <Image style={styles.logoStyle} source={require('./../images/MainLogo.png')}/>
                    </View>
              </Animation>
          
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1, 
        marginTop:responsiveHeight(6),
        marginHorizontal:responsiveWidth(20),
    },
    logoStyle:{
        height:responsiveHeight(80),
        width:responsiveWidth(60),
        resizeMode: 'contain'
        
    },
    TextStyle:{
        color:'rgb(0, 0, 0)',
        marginHorizontal:responsiveWidth(10),
        width:responsiveWidth(20)
    }
});
export default SplashScreen