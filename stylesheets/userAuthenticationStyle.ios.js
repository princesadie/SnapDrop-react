'use strict'
const React = require('react-native');
const {
  StyleSheet,
  PixelRatio,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(236,64,122,1)',
  },
  logo: {
    marginLeft: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    width: 200,
    backgroundColor: '#FFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 95,
  },
  avatarContainer: {
    borderColor: '#FFF',
    borderWidth: 3 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 85,
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
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
  logQuestion: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 112
  },
  regQuestion: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 98
  },
  text: {
    color: '#FFF'
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
