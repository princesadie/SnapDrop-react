/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var markers = [
  {
    latitude: 41.890731,
    longitude: -87.637604,
    title: 'My Pin',
    subtitle: 'Sweet Info Here'
  }
];

import React, {
  Component,
  StyleSheet,
  View,
  TouchableHighlight,
  MapView

} from 'react-native';

var SearchBar = require('react-native-search-bar');

class AppleMap extends Component {
  render() {
    return (


    <View style={styles.container}>
          <SearchBar
        placeholder='Search'
        textFieldBackgroundColor='blue'/>
      <MapView
        style={ styles.map }
        initialRegion={{
          latitude: 41.890731,
          longitude: -87.637604,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        annotations={markers}
        region={{
          latitude: 41.890731,
          longitude: -87.637604,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#515154',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

module.exports = AppleMap;
