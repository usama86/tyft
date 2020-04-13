import React from 'react';
import {Text,View} from 'react-native';
import Header from '../../../Component/Header';
const UserProfile=({navigation})=>{
        return(
            <View>
                <Header onPress={()=>navigation.goBack()} >{'Profile'}</Header>
                <Text>Profile</Text>
            </View>
        )
}

export default UserProfile;