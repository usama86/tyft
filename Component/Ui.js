import React from 'react';
import {View,StyleSheet } from 'react-native';
import Text from './Text';
import {Image} from 'react-native';
import {responsiveHeight,responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions';
import Container from './Container';
import Button from './Button';
import Entypo from 'react-native-vector-icons/Entypo';
const Ui=({TextValue,TextViewStyle,TextStyle,ContainerStyle,children,ContentStyle,FooterStyle,ButtonText,TextSpace})=>{
return(
    <Container ContentStyle={[styles.container,ContainerStyle]}>
            <View style={[styles.TextView,TextViewStyle]}>
                <Text bold value={TextValue} style={TextStyle}/>
            </View>


           <View style={ContentStyle}>
                {children}   
            </View> 
           

            <View style={FooterStyle}>
                    <Button
						style={styles.buttonStyle2}
						
						onPress={() => {
							// navigation.navigate(RouteName.SIGNUPSELECTION);
						}}
					>
						<Image style={styles.logoStyle1} source={require('./../images/TYFTLogo.png')} />
						<Text uppercase={false} style={[styles.TextStyle1,TextSpace]} value={ButtonText}/>
						<Entypo
							//style={{ marginLeft: responsiveWidth(16) }}
							name="chevron-thin-right"
							size={15}
							color="rgb(0, 0, 0)"
						/>
					</Button>
            </View>
    </Container>
)
}
const styles=StyleSheet.create({
    container:{
        width:responsiveWidth(90),
        marginTop:responsiveHeight(7),
        marginHorizontal:responsiveWidth(6),
    },
    TextView:{
        width:responsiveWidth(60)
    },
    TextStyle:{
        fontSize:responsiveFontSize(3),
        fontWeight:'bold'
    },
    TextStyle1:{ 
        color: 'rgb(0, 0, 0)', 
        paddingLeft:responsiveWidth(24),
        width:responsiveWidth(57) 
    },
    InputMainView:{
        marginVertical:responsiveHeight(5),
        
    },
    Input:{
        marginTop:responsiveHeight(3)
    },
    radioView:{
        marginLeft:responsiveWidth(15),
        flexDirection:'row'
    },
    buttonStyle2: {
		backgroundColor: 'white',

		marginVertical: responsiveHeight(5),
		width: responsiveWidth(80),
		justifyContent: 'flex-start',
		paddingLeft: 10,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgb(0, 0, 0)'
    },
    logoStyle1: {
		height: responsiveHeight(4),
		width: responsiveWidth(7),
		resizeMode: 'contain',
		marginLeft: responsiveWidth(3)
	},
})
export default Ui;