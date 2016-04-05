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
    console.log('-----------------------------------')
    console.log('entered goNext2')
    this.props.navigator.push({
      title: 'Image Details',
      component: ImageViewPage,
      navigationBarHidden: true,
      passProps: {imageData: imageData.obj, cat: 'cat', sourceIm: sourceIm}
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

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
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

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[nativeImagePickerStyles.avatar, nativeImagePickerStyles.avatarContainer]}>
            <Text style={nativeImagePickerStyles.text} >TAKE VIDEO</Text>
          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }
      </View>
    );
  }

}

module.exports = NativeImagePicker;
