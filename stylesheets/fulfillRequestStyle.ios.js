'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rightContainer: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  coords: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#fff',
  },
});
