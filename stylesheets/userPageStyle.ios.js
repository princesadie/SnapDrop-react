'use strict'
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container2: {
   flex: 1,
   flexDirection: 'column',
   backgroundColor: 'rgba(236,64,122,1)',
 },
 content2: {
   flex: 1,
   height: 50,
   flexDirection: 'column',
   marginTop: 30,
   backgroundColor: 'rgba(236,64,122,1)',
 },
 welcome2: {
   marginTop: 20,
   textAlign: 'center',
 },
 button2: {
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
 buttonText2: {
   color: 'rgba(236,64,122,1)',
   textAlign: 'center',
   marginTop: 10,
   fontWeight: 'bold',
 },
 buttonContainer2:{
   marginTop: 10,
   paddingTop:30,
   paddingBottom:10,
   flexDirection:'column',
   backgroundColor: 'rgba(236,64,122,1)',
 },
 avatar2: {
   borderRadius: 100,
   width: 200,
   height: 200,
   marginLeft: 85,
  //  borderWidth: 3 / PixelRatio.get(),
   borderColor: '#FFF',
 },
});
