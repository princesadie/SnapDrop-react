'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  wrapper: {
  },
  base64: {
    flex: 1,
    marginTop: 35,
    height: 380,
    borderRadius: 1,
    resizeMode: 'contain',
  },
  avatar: {
    borderRadius: 5,
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
  },
  bubble: {
    width: 200,
    backgroundColor: 'rgba(236,64,122,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 95,
  },
  button: {
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
  },
  buttonContainer:{
    marginTop: 60,
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'column',
    backgroundColor: '#fff',
  },
});
