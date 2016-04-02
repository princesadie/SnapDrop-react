/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var Deeper = require('./deeper.ios')

import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  Text,
  Firebase

} from 'react-native';

class Profile extends Component {
  goNext() {
    this.props.navigator.push({
      title: 'One More Down',
      component: Deeper,
      passProps: {dataToBePassed: 'We go one more down the stack', newInformation: this.props.dataToBePassed}
    })
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.welcome}>{this.props.dataToBePassed}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goNext()}>
                <Text style={styles.buttonText}>GO DEEPER</Text>
            </TouchableHighlight>
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

module.exports = Profile;
