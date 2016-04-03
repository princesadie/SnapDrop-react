/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var Map = require('./appleMap.ios')

import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Camera from 'react-native-camera';

class CameraView extends Component {
  goNext() {
    this.props.navigator.push({
      title: 'AppleMap',
      component: AppleMap,
      passProps: {dataToBePassed: "MAP HERE"}
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      // .then((data) => console.log(data))
      // .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

module.exports = CameraView;
