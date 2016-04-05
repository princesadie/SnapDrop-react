/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var cameraStyles = require('../stylesheets/cameraStyle.ios')
var Map = require('./map.ios')

import React, {
  Component,
  Dimensions,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Camera from 'react-native-camera';

class CameraView extends Component {
  goNext() {
    this.props.navigator.push({
      title: 'Map',
      component: Map,
      passProps: {dataToBePassed: "MAP HERE"}
    })
  }

  render() {
    return (
      <View style={cameraStyles.container}>
      <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={cameraStyles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={cameraStyles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
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

module.exports = CameraView;
