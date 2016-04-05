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
  button3: {
    flex: 1,
    width: 150,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#7986CB',
  },
  buttonText3: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer3:{
    flexDirection:'row',
    backgroundColor: '#fff',
    marginTop: 0
  },
  textEdit: {
    height: 40,
    marginBottom: 0,
    borderColor: 'green',
    backgroundColor: 'orange',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
});
