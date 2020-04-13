import React from 'react';
import {Text,View} from 'react-native';
import Header from '../../../Component/Header';
const UserProfile=({navigation})=>{
        return(
            <View>
                <Header isHome onPress={()=>navigation.openDrawer()} >{'Profile'}</Header>
                <Text>Profile</Text>
            </View>
        )
}

export default UserProfile;