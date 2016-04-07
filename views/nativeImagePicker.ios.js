import React from 'react-native';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var ImageViewPage = require('./imageViewPage.ios')
var nativeImagePickerStyles = require('../stylesheets/nativeImagePickerStyle.ios')


const {
  Text,
  View,
  TouchableOpacity,
  Image,
  NativeModules: {
    ImagePickerManager
  }
} = React;

class NativeImagePicker extends React.Component {
  state = {
    avatarSource: null,
    videoSource: null
  };

  goNext2(imageData, sourceIm) {
    this.props.navigator.push({
      component: ImageViewPage,
      navigationBarHidden: true,
      passProps: {imageData: imageData.obj, sourceIm: sourceIm}
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

        var resData = response.data
        var imageData = resData.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\f/g, "").replace(/=/g, "");

        var imagereplaced = imageData.replace(/=/g, "");
        var obj = "data:image/jpeg;base64," + imagereplaced;
        var objJson = JSON.stringify({"obj": obj})
        this.goNext2(objJson, source);
      }
    });
  }

  render() {
    return (
      <View style={nativeImagePickerStyles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[nativeImagePickerStyles.avatar, nativeImagePickerStyles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text style={nativeImagePickerStyles.text}>TAKE PHOTO</Text> :
            <Image style={nativeImagePickerStyles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
module.exports = NativeImagePicker;
