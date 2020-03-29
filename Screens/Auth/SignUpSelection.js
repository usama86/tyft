import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Text, Icon } from 'react-native-elements';
import theme from './../theme';
import * as RouteName from '../../Constants/RouteName';

const SignUpSelection = props => {
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.signUpHeader}>{'SIGN UP'}</Text>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#f7f7f5"
        style={styles.item}
        onPress={() => {
          navigation.navigate(RouteName.SIGNUP);
        }}>
        <View>
          <View style={styles.itemHeader}>
            <View style={styles.leftIcon}>
              <Icon
                name="shopping-cart"
                color={theme.colors.primary}
                size={33}
              />
            </View>
            <Text style={styles.itemTitle}>{'As Customer'}</Text>
          </View>
          <Text style={styles.itemText}>
            Search the propane and oil venders in your area, with GASLIO you can
            search and place order easily
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#f7f7f5"
        style={styles.item}
        onPress={() => {
          navigation.navigate(RouteName.SIGNUPSUPPLIER);
        }}>
        <View>
          <View style={styles.itemHeader}>
            <View style={styles.leftIcon}>
              <Icon
                name="truck-delivery"
                type="material-community"
                color={theme.colors.primary}
                size={33}
              />
            </View>
            <Text style={styles.itemTitle}>{'As Supplier'}</Text>
          </View>
          <Text style={styles.itemText}>
            Create a part of GASLIO vender list and target the local audiendce
            near you.It helps you to promote your business in your local are.
          </Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 30,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  signUpHeader: {
    fontSize: 23,
    fontWeight: '600',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      },
    }),
    marginTop: 50,
    marginBottom: 50,
    paddingLeft: 60,
  },
  item: {
    height: 150,
    flexDirection: 'column',
    paddingLeft: 50,
    paddingRight: 50,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  leftIcon: {},
  itemTitle: {
    flex: 2,
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 12,
    color: 'dimgray',
    lineHeight: 25,
  },
  backButtonContainer: {
    flex: 1,
    margin: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  backButton: {
    backgroundColor: theme.colors.secondary,
  },
});

export default SignUpSelection;
