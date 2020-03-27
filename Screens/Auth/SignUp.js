import React from 'react';
import {View,StyleSheet } from 'react-native';
import Input from './../../Component/Input';
import Text from './../../Component/Text';
import {responsiveHeight,responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions';
import Container from './../../Component/Container';
const SignUp=()=>{
    const [name,SetName]=React.useState('');
    const [check, SetCheck]=React.useState(false);
   const changeInputHandler=(e)=>{
       SetName(e);
    }
return(
    <Container ContentStyle={styles.container}>
            <View style={styles.TextView}>
                <Text bold value={"Let's Create your Customer account"}/>
            </View>
            <View style={styles.InputMainView}>
            <Input rounded placeholder='Name' onChangeText={changeInputHandler} value={name} style={styles.Input}/>
            <Input rounded placeholder='Email Address' style={styles.Input}/>
            <Input rounded placeholder='Cell Phone' style={styles.Input}/>
            <Input rounded placeholder='Password' style={styles.Input}/>
            <Input rounded placeholder='Re-enter Password' style={styles.Input}/>
            </View>
    </Container>
)
}
const styles=StyleSheet.create({
    container:{
        width:responsiveWidth(90),
        marginTop:responsiveHeight(10),
        marginHorizontal:responsiveWidth(6),
    },
    TextView:{
        width:responsiveWidth(60)
    },
    TextStyle:{
        fontSize:responsiveFontSize(3),
        fontWeight:'bold'
    },
    InputMainView:{
        marginVertical:responsiveHeight(5),
        
    },
    Input:{
        marginTop:responsiveHeight(3)
    }
})
export default SignUp;