/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import Firebase from 'firebase';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var FulfillmentViewPage = require('./fulfillmentViewPage.ios');
var requestDetailStyles = require('../stylesheets/requestDetailStyle.ios')

import React, {
  Component,
  Dimensions,
  View,
  Image,
  TouchableHighlight,
  Text,
  TouchableOpacity,

} from 'react-native';

class RequestDetail extends Component {
  state = {
    avatarSource: null,
    videoSource: null
  };

  componentDidMount() {
    this.selectPhotoTapped.bind(this)
  }

  goNext2(imageData, sourceIm) {
    this.props.navigator.push({
      title: 'Image Details',
      component: FulfillmentViewPage,
      navigationBarHidden: true,
      passProps: {imageData: imageData.obj, sourceIm: sourceIm, requestKey: this.props.requestKey, requestCoordinate: this.props.coordinate, requestDescription: this.props.description}
    })
  }

  selectPhotoTapped() {
    const options = {
      title: 'Photo Picker',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      },
      allowsEditing: true
  };

    ImagePickerManager.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        // const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        console.log('---------------------------------')
        // this.setState({
        //   avatarSource: source
        // });

        // console.log(response.data)
        var resData = response.data
        console.log('response data')
        console.log(resData)

        var imageData = resData.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\f/g, "").replace(/=/g, "");
        console.log('image data')
        console.log(imageData)

        var imagereplaced = imageData.replace(/=/g, "");
        console.log('image data replaced')
        console.log(imagereplaced)

        var obj = "data:image/jpeg;base64," + imagereplaced;
        console.log('obj')
        console.log(obj)

        var objJson = JSON.stringify({"obj": obj})
        console.log('json obj')
        console.log(objJson)
        console.log('---------------------------------')

        this.goNext2(objJson, source);
      }
    });
  }

  render() {
    return (
      <View style={requestDetailStyles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[requestDetailStyles.avatar, requestDetailStyles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text style={requestDetailStyles.text}>TAKE PHOTO</Text> :
            <Image style={requestDetailStyles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }
      </View>
    );
  }
}
module.exports = RequestDetail;
