import React from 'react';
import {View,StyleSheet } from 'react-native';
import Input from './../../Component/Input';
import { Container, Text,Content } from 'native-base';
import {responsiveHeight,responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions';
const SignUp=()=>{
return(
    <Container style={{width:'100%',height:'100%'}}>
       <Content style={styles.container}> 
            <View style={styles.TextView}>
                <Text style={styles.TextStyle}>Let's Create your Customer account</Text>
            </View>
            <View style={styles.InputMainView}>
            <Input rounded placeholder='Name' style={styles.Input}/>
            <Input rounded placeholder='Email Address' style={styles.Input}/>
            <Input rounded placeholder='Cell Phone' style={styles.Input}/>
            <Input rounded placeholder='Password' style={styles.Input}/>
            <Input rounded placeholder='Re-enter Password' style={styles.Input}/>
            </View>
        </Content>
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