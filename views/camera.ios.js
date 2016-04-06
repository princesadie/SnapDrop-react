/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 var cameraStyles = require('../stylesheets/cameraStyle.ios')
 var Map = require('./map.ios')

 import React, {
  Component,
  View,
  // Dimensions,
  Text,
  // TouchableHighlight
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
  }
}
module.exports = CameraView;
