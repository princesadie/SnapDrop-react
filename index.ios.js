/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */


// var Home = require('./views/home.ios')
var SwiperView = require('./views/swiper.ios')

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS,
  Firebase
} from 'react-native';

class SnapDrop extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Home',
          component: SwiperView
      }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('SnapDrop', () => SnapDrop);
