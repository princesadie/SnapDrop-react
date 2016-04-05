'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(236,64,122,1)',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#C2185B',
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
    paddingTop: 20,
    backgroundColor: 'rgba(236,64,122,1)',
  },
  navBar: {
    flex: 1,
    height: 60,
  },
  avatar1: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  avatar2: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  avatar1: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  avatar2: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
});
