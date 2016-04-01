/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  Text,
  TextInput,
  StyleSheet,
  View

} from 'react-native';

// var SearchBarTag = require('react-native-search-bar');

var SearchBar = React.createClass({

  getInitialState: function() {
    return {
      text: "",
    };
  },

  render: function() {
    return (

      <View style={styles.container2}>

        <Text style={styles.welcome}>
          This finally f'ing works
        </Text>

        <TextInput style={styles.textEdit}
          onChangeText={(text) => this.setState({text})}
          placeholder="enter a location"/>

        <Text style={styles.instructions}>
          {this.state.text}
        </Text>

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
  instructions: {
    color: 'blue',
    fontSize: 22,
    marginBottom: 5,
  },
  textEdit: {
    height: 40,
    borderColor: 'green',
    backgroundColor: 'orange',
    borderWidth: 1,
  },
});
// React.AppRegistry.registerComponent('SearchBar', () => SearchBar);
module.exports = SearchBar;