import React from 'react';
import {View, StyleSheet} from 'react-native';
import Input from '../../Component/Input';
import Text from '../../Component/Text';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Radio from '../../Component/Radio';
import Ui from '../../Component/Ui';
const SignUp = () => {
  const [name, SetName] = React.useState('');
  const [radio, setRadio] = React.useState(true);
  const [radio1, setRadio1] = React.useState(false);
  const changeInputHandler = e => {
    SetName(e);
  };
  return (
    <Ui
      TextValue={"Let's Create your Customer account"}
      ButtonText={'Get Started'}
      TextSpace={styles.TextSpace}
      TextViewStyle={styles.TextViewStyle}>
      <View style={styles.InputMainView}>
        <Input
          rounded
          placeholder="Name"
          onChangeText={changeInputHandler}
          value={name}
          style={styles.Input}
        />
        <Input rounded placeholder="Email Address" style={styles.Input} />
        <Input rounded placeholder="Cell Phone" style={styles.Input} />
        <Input rounded placeholder="Password" style={styles.Input} />
        <Input rounded placeholder="Re-enter Password" style={styles.Input} />
      </View>

      <View style={styles.radioView}>
        <Radio
          selected={radio}
          onPress={e => {
            if (radio !== radio1) {
              var x = radio;
              var y = radio1;
              setRadio1(x);
              setRadio(y);
            } else {
              setRadio(!radio);
            }
          }}
        />
        <Text value={'English'} style={{marginLeft: responsiveWidth(2)}} />

        <Radio
          selected={radio1}
          onPress={() => {
            if (radio !== radio1) {
              var x = radio;
              var y = radio1;
              setRadio1(x);
              setRadio(y);
            } else {
              setRadio1(!radio1);
            }
          }}
          style={{marginLeft: responsiveWidth(8)}}
        />
        <Text value={'Spanish'} style={{marginLeft: responsiveWidth(2)}} />
      </View>
    </Ui>
<<<<<<< HEAD
  );
};
const styles = StyleSheet.create({
  InputMainView: {
    marginVertical: responsiveHeight(2),
  },
  TextViewStyle: {
    // width: responsiveWidth(60)
  },
  Input: {
    marginTop: responsiveHeight(3),
  },
  radioView: {
    marginLeft: responsiveWidth(15),
    flexDirection: 'row',
  },
  TextSpace: {
    // paddingLeft:responsiveWidth(18)
  },
});
export default SignUp;
=======
    
)
}
const styles=StyleSheet.create({
    InputMainView:{
        marginVertical:responsiveHeight(2),        
    },
    TextViewStyle:{
       // width: responsiveWidth(60)
    },
    Input:{
        marginTop:responsiveHeight(3)
    },
    radioView:{
        marginLeft:responsiveWidth(15),
        marginTop:responsiveHeight(5),
        flexDirection:'row'
    },
    TextSpace:{
        // paddingLeft:responsiveWidth(18)
    }
})
export default SignUp;
>>>>>>> f9f3037097c90352ff4a5b414050177494016cd2
