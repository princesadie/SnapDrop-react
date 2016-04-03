/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  TouchableHighlight,
  Component,

  Text,
  TextInput,
  StyleSheet,
  View

} from 'react-native';

// var SearchBarTag = require('react-native-search-bar');

var SearchBar = React.createClass({

  goLocation: function() {
    console.log(this.state.text2)
  },

  getInitialState: function() {
    return {
      text2: "Chicago as a default",
    };
  },

  render: function() {
    return (

      <View style={styles.container2}>

        <Text style={styles.welcome}>
          This finally f'ing works
        </Text>

        <TextInput style={styles.textEdit}
          onChangeText={(text2) => this.setState({text2})}
          placeholder="enter a location"/>

        <Text style={styles.locationOutput}>
          {this.state.text2}
        </Text>

        <TouchableHighlight
          style={styles.button2}
          underlayColor='#9FA8DA'
          onPress={() => this.goLocation()}>
            <Text style={styles.buttonText2}>Go to Location</Text>
        </TouchableHighlight>

      </View>

    );


  }


});

const styles = StyleSheet.create({
  container2: {
    marginTop: 60,
    flex: 1,
    backgroundColor: 'pink',
    padding: 20,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 5,
  },
  button2: {
    height: 36,
    width: 300,
    marginTop: 20,
    marginLeft: 42,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#7986CB',
  },
  buttonText2: {
    color: 'white',
    textAlign: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  locationOutput: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 22,
    marginBottom: 5,
    marginTop: 20,
  },
  textEdit: {
    height: 40,
    borderColor: 'green',
    backgroundColor: 'orange',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
});

module.exports = SearchBar;