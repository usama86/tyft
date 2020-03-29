import React from 'react';
import {View,StyleSheet } from 'react-native';
import Input from '../../../Component/Input';
import Text from '../../../Component/Text';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import Checkbox from '../../../Component/Checkbox';
import Ui from '../../../Component/Ui';
import * as RouteName from './../../../Constants/RouteName';
const TruckLogo=({navigation})=>{
    const [check,SetCheck]=React.useState(false);
    const [name,SetName]=React.useState('')
    const changeInputHandler=()=>{
        SetCheck(!check);
    }
return(
    <Ui 
    TextValue={"Your food's truck logo"} 
    TextViewStyle={styles.UiText} 
    ContentStyle={styles.ContentStyle} 
    ButtonText={"Next"}
    onPressButton={()=>navigation.navigate(RouteName.TRUCKINFO)}
    >
         <View style={styles.InputMainView}>
              <Text value={"Upload a logo photo to help users quickly recognize your brand"}
                style={{color:'grey'}}
              />
        </View>

            <View style={styles.radioView}>
               {/* ADD PHOTO Component */}
            
            </View>
    </Ui>
    
)
}
const styles=StyleSheet.create({
    InputMainView:{
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(8)
        
    },
    ContentStyle:{
       // height:responsiveHeight(65)
    },
    UiText:{
        width:responsiveWidth(70)
    },
    Input:{
        marginTop:responsiveHeight(3)
    },
    radioView:{
        flexDirection:'row'
    },
})
export default TruckLogo;