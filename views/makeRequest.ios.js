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
  Text,
  Firebase

} from 'react-native';

class MakeRequest extends Component {

  render() {
    return(
      <View>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.welcome}>New Request</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    height: 50,
    flexDirection: 'column',
    marginTop: 200,
  },
  welcome: {
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    width: 300,
    marginTop: 100,
    marginLeft: 42,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#7986CB',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonContainer:{
    marginTop: 60,
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'column',
    backgroundColor: '#fff',
  },
});

module.exports = MakeRequest;
