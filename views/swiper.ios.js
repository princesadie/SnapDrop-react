var Swiper = require('react-native-swiper')
// es6
// import Swiper from 'react-native-swiper'

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView,
  TouchableHighlight,
  Component,
  Dimensions
} = React;

var markers = [
  {
    latitude: 41.890731,
    longitude: -87.637604,
    title: 'My Pin',
    subtitle: 'Sweet Info Here'
  }
];

import Camera from 'react-native-camera';

var SwiperView = React.createClass({
  takePicture() {
    this.camera.capture()
      // .then((data) => console.log(data))
      // .catch(err => console.error(err));
  },
  render: function() {
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
      <View style={styles.slide2}>
      <Text style={styles.buttonText}>Swipe right for Camera and left for Map</Text>
      </View>
      <View style={styles.slide3}>
      <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture}>[CAPTURE]</Text>
        </Camera>
      </View>
        <View style={styles.slide1}>
          <MapView
            style={ styles.map }
            initialRegion={{
              latitude: 41.890731,
              longitude: -87.637604,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            annotations={markers}
            region={{
              latitude: 41.890731,
              longitude: -87.637604,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </Swiper>
    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 7,
  },
})

module.exports = SwiperView;
