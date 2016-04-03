/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  Text

} from 'react-native';

class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.props.dataToBePassed}</Text>
        <Text style={styles.welcome}>{this.props.newInformation}</Text>
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    flex: -1,
    flexDirection: 'row',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 7,
  },
});

module.exports = Profile;
