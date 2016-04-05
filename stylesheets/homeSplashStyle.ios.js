'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },

  strech2: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },

  enterView: {
    position: 'absolute',
    top: 500,
    left: 90,
    backgroundColor: 'transparent'
  },

  enterText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  }
});
