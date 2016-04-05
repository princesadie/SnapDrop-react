'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  avatar: {
    borderRadius: 5,
    width: 350,
    height: 350
  },
  button: {
    flex: 1,
    height: 30,
    width: 150,
    marginTop: 20,
    marginLeft: 42,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#7986CB',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonContainer:{
    marginTop: 60,
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'column',
    backgroundColor: '#fff',
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
