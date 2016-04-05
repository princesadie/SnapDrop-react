var MapView = require('./map.ios')
var CreateUser = require('./createUser.ios')

import React, {
  TouchableHighlight,
  Image,
  Component,
  Text,
  TextInput,
  StyleSheet,
  View

} from 'react-native';

// var SearchBarTag = require('react-native-search-bar');

var HomeSplash = React.createClass({

  selectRoute() {
    this.props.navigator.push({
      title: 'User Page',
      navigationBarHidden: true,
      component: CreateUser,
    });
  },

  render() {
    return (

      <View style = {styles.container}>
        <Image style = {styles.strech2} source = {require('../images/splash.png')} />
              <View style = {styles.enterView}>
        <Text style = {styles.enterText} onPress={() => this.selectRoute()}> [ ENTER ] </Text>
      </View>
      </View>

    );


  }


});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },

  strech2: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },

  enterView: {
    position: 'absolute',
    top: 500,
    left: 90,
    backgroundColor: 'transparent'
  },

  enterText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  }
});

module.exports = HomeSplash;
