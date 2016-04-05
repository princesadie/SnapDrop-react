/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var searchBarStyles = require('../stylesheets/searchBarStyle.ios');

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

      <View style={searchBarStyles.container2}>

        <Text style={searchBarStyles.welcome}>
          This finally fing works
        </Text>

        <TextInput style={searchBarStyles.textEdit}
          onChangeText={(text2) => this.setState({text2})}
          placeholder="enter a location"/>

        <Text style={searchBarStyles.locationOutput}>
          {this.state.text2}
        </Text>

        <TouchableHighlight
          style={searchBarStyles.button2}
          underlayColor='#9FA8DA'
          onPress={() => this.goLocation()}>
            <Text style={searchBarStyles.buttonText2}>Go to Location</Text>
        </TouchableHighlight>

      </View>

    );


  }


});

module.exports = SearchBar;
