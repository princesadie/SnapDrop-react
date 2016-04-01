/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var markers2 = [
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
  Text,
  TouchableHighlight,

} from 'react-native';

class GoogleMap extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> This is where google maps will go </Text>
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

module.exports = GoogleMap;
