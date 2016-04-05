var MapView = require('./map.ios')
var CreateUser = require('./createUser.ios')
var homeSplashStyles = require('../stylesheets/homeSplashStyle.ios')

import React, {
  TouchableHighlight,
  Image,
  Component,
  Text,
  TextInput,
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

      <View style = {homeSplashStyles.container}>
        <Image style = {homeSplashStyles.strech2} source = {require('../images/splash.png')} />
              <View style = {homeSplashStyles.enterView}>
        <Text style = {homeSplashStyles.enterText} onPress={() => this.selectRoute()}> [ ENTER ] </Text>
      </View>
      </View>

    );


  }


});

module.exports = HomeSplash;
