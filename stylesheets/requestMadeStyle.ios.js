'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(236,64,122,1)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  navBar: {
    height: 60,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  rightContainer: {
    flex: 1,
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
    width: 65,
    height: 80,
  },
  listView: {
    height: 1000,
    backgroundColor: 'rgba(236,64,122,1)',
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  avatar1: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  avatar2: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
