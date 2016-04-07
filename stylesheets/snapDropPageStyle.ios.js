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
  notice: {
    fontSize: 32,
    color: 'white',
  },
  navBar: {
    height: 60,
    marginBottom: 10,
  },
  pad: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#EC407A',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  rightContainer: {
    flex: 1,
  },
  description: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Avenir Next',
    color: '#EC4074',
  },
  coords: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 400,
    height: 200,
  },
  listView: {
    height: 1000,
    backgroundColor: 'rgba(236,64,122,1)',
  },
  avatarBack: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  avatar: {
    width: 250,
    height: 250
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
