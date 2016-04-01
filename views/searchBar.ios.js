/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  Component,
  Text,
  StyleSheet,
  View

} from 'react-native';

var SearchBarTag = require('react-native-search-bar');

var SearchBar = React.createClass({
  render: function() {
    return (
      // <View style={styles.container2}>
      <SearchBarTag>
        ref='searchBar'
        placeholder='Search'
      </SearchBarTag>

      //     <Text style={styles.welcome}>{this.props.dataToBePassed}</Text>
      // </View>
    );
    this.refs.searchBar.focus();

  }


});

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
// React.AppRegistry.registerComponent('SearchBar', () => SearchBar);
module.exports = SearchBar;