var HomeSplash = require('./views/homeSplash.ios')
var indexStyles = require('./stylesheets/indexStyle.ios')
var SnapDropPage = require('./views/snapDropPage.ios')

import React, {
  AppRegistry,
  Component,
  NavigatorIOS
} from 'react-native';

class SnapDrop extends Component {
  render() {
    return (
      <NavigatorIOS
        style={indexStyles.container}
        initialRoute={{
          title: 'SnapDrop',
          navigationBarHidden: true,
          component: HomeSplash
      }}/>
    );
  }
}

AppRegistry.registerComponent('SnapDrop', () => SnapDrop);
