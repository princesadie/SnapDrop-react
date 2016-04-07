'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create(
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'pink',
  },
  avatar: {
    borderRadius: 5,
    flex: 1
  },
  button: {
    height: 36,
    width: 300,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  buttonText: {
    color: 'rgba(236,64,122,1)',
    textAlign: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  buttonContainer3:{
    flexDirection:'row',
    backgroundColor: '#fff',
    marginTop: 0
  },
  textEdit: {
    fontWeight: 'bold',
    height: 40,
    width: 300,
    color: 'rgba(236,64,122,1)',
    borderColor: '#FFF',
    backgroundColor: '#f6f6f6',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
});
