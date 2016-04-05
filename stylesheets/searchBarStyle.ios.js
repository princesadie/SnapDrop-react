'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
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
  button2: {
    height: 36,
    width: 300,
    marginTop: 20,
    marginLeft: 42,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#7986CB',
  },
  buttonText2: {
    color: 'white',
    textAlign: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  locationOutput: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 22,
    marginBottom: 5,
    marginTop: 20,
  },
  textEdit: {
    height: 40,
    borderColor: 'green',
    backgroundColor: 'orange',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
});
