'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6'
  },
  avatarContainer: {
    borderColor: '#EC407A',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  text: {
    color: '#EC407A',
  }
});
