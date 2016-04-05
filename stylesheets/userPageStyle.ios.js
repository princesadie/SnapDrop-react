'use strict'
const { StyleSheet } = React;

import React, {
  Component,
  Dimensions,
  View,
  Image,
  PixelRatio,
  TouchableHighlight,
  Navigator,
  Text,
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column',
   backgroundColor: 'rgba(236,64,122,1)',
 },
 content: {
   flex: 1,
   height: 50,
   flexDirection: 'column',
   marginTop: 30,
   backgroundColor: 'rgba(236,64,122,1)',
 },
 welcome: {
   marginTop: 20,
   textAlign: 'center',
 },
 button: {
   flex: 1,
   flexDirection: 'row',
   height: 36,
   width: 300,
   marginTop: 30,
   marginLeft: 42,
   borderRadius: 10,
   justifyContent: 'center',
   backgroundColor: '#FFF',
 },
 buttonText: {
   color: 'rgba(236,64,122,1)',
   textAlign: 'center',
   marginTop: 10,
   fontWeight: 'bold',
 },
 buttonContainer:{
   marginTop: 10,
   paddingTop:30,
   paddingBottom:10,
   flexDirection:'column',
   backgroundColor: 'rgba(236,64,122,1)',
 },
 avatar: {
   borderRadius: 100,
   width: 200,
   height: 200,
   marginLeft: 85,
   borderWidth: 3 / PixelRatio.get(),
   borderColor: '#FFF',
 },
});

module.exports = StyleSheet;
