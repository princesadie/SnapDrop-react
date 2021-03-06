var UserAuthentication = require('./userAuthentication.ios')
var homeSplashStyles = require('../stylesheets/homeSplashStyle.ios')

import React, {
  TouchableHighlight,
  Image,
  Component,
  Text,
  View
} from 'react-native';

var HomeSplash = React.createClass({

  selectRoute() {
    console.log('---------------------homespl----------------')
    this.props.navigator.push({
      navigationBarHidden: true,
      component: UserAuthentication,
    });
  },

  render() {
    return (
      <View style = {homeSplashStyles.container}>
        <Image style = {homeSplashStyles.strech2} source = {require('../images/splash.png')} />
        <View style = {homeSplashStyles.enterView}>
          <Text style = {homeSplashStyles.enterText} onPress={() => this.selectRoute()}> [ ENTER ]
          </Text>
        </View>
      </View>
    );
  }
});
module.exports = HomeSplash;
