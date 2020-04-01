import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Container from '../../Component/Container';
import Button from '../../Component/Button';
import Text from '../../Component/Text';
import theme from '../theme';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const FindFoodTruck = ({navigation}) => {
  return (
    <Container containerStyle={styles.ContainerStyles}>
      <View style={styles.seacrhbarContainter}>
        <SearchBar
          placeholder="Type something..."
        //   onChangeText={this.updateSearch}
          // value={search}
          round
          lightTheme
          leftIconContainerStyle={{
            borderRadius: 20,
            height: 30,
            left: -12,
          }}
          inputContainerStyle={{
            backgroundColor: '#F5F5F5',
            width: '100%',
            paddingLeft: 5,
            borderWidth:0
          }}
          searchIcon={
            <TouchableOpacity>
              <Icon
                name="search"
                size={30}
                color="grey"
                style={{marginLeft: 0}}
              />
            </TouchableOpacity>
          }
          containerStyle={{
            backgroundColor: 'white',
            width: '90%',
            alignSelf: 'center',
            borderWidth:0
          }}
        />
      </View>
      <View style={styles.flexView}>
        <Button style={styles.button}>
          <Text style={styles.TextStyle} value={'Burger'} />
        </Button>
        <Button style={styles.button}>
          <Text style={styles.TextStyle} value={'Pizza'} />
        </Button>
        <Button style={styles.button}>
          <Text style={styles.TextStyle} value={'BBQ'} />
        </Button>
        <TouchableOpacity>
          <Image
            style={{width: responsiveWidth(8), height: responsiveHeight(4)}}
            source={require('../../images/filter.png')}
          />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  flexView: {
    width: '100%',
    height: responsiveHeight(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: '25%',
    height: responsiveHeight(7),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
  TextStyle: {
    color: 'white',
  },
  seacrhbarContainter: {
    backgroundColor: 'white',
    height: responsiveHeight(8),
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default FindFoodTruck;
