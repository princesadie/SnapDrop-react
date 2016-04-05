/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import Firebase from 'firebase';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var FulfillmentViewPage = require('./fulfillmentViewPage.ios');

import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableHighlight,
  Text,
  PixelRatio,
  TouchableOpacity,

} from 'react-native';

class RequestDetail extends Component {
  state = {
    avatarSource: null,
    videoSource: null
  };

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
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text style={styles.text}>TAKE PHOTO</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text style={styles.text} >TAKE VIDEO</Text>
          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  content: {
    flex: 1,
    height: 50,
    flexDirection: 'column',
    marginTop: 200,
  },
  welcome: {
    textAlign: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    width: 300,
    marginTop: 100,
    marginLeft: 42,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#7986CB',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonContainer:{
    marginTop: 60,
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'column',
    backgroundColor: '#fff',
  },
});

module.exports = RequestDetail;
