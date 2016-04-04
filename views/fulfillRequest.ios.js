/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Firebase from 'firebase'

var seed = ['1', '2', '3'];

const fulfillableOrders = new Firebase("https://snapdrop.firebaseio.com/fulfillments");

class FulfillRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fulfillableData: {}
    };
    this.fulfillableRef = this.getRef().child('0');
  }

  listenForFulfillable(fulfillableRef) {
    fulfillableRef.on('value'
  }

  render() {
    return(
      <View>
        <View style={styles.container}>

          <View style={styles.content}>
            <Text>{{}}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.welcome}>Fullfill Request</Text>
            <Text style={styles.welcome}>{seed[0]}</Text>
          </View>

          <View style={styles.buttonContainer}>
            {seed.map(function(index) {
              return (
                <TouchableHighlight
                  key={seed[index]}
                  style={styles.button}
                  onPress={() => this.goCamera()}>
                    <Text style={styles.buttonText}>{seed[index]}</Text>
                </TouchableHighlight>
              )
            })}
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

module.exports = FulfillRequest;
