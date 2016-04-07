var NativeImagePicker = require('./nativeImagePicker.ios')
var React = require('react-native');
var AddCaptionPage = require('./addCaptionPage.ios')
var imageViewPageStyles = require('../stylesheets/imageViewPageStyle.ios')

var {
  View,
  NativeImagePicker,
  Component,
  Text,
  Image,
  Alert,
  ListView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
  Dimensions,
  NativeModules: {
    ImagePickerManager
  }
} = React;

var Home = require('./home.ios')
var currentView = 'start'

class ImageViewPage extends Component {

  sendImage() {
    var userRef = new Firebase("https://snapdrop.firebaseio.com/users/0")
    userRef.update({
      requestImage: this.props.sourceIm
    })
    this.props.navigator.popN(2);
  }
  cancelImage() {
    this.props.navigator.popN(1);
  }
  keyboardWillShow (e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({visibleHeight: newSize});
  }

  keyboardWillHide (e) {
    this.setState({visibleHeight: Dimensions.get('window').height});
  }
  // Scroll a component into view. Just pass the component ref string.
  inputFocused (refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50);
  }
  constructor(props) {
    super(props)
    this.state = {
      captionText: ''
    };
  }

  render() {
    console.log('------------------------------------------')
    console.log('entered Image View Page')
    console.log(this.props.imageData)
    console.log(this.props.cat)
    console.log('------------------------------------------')
    return (
      <View style={imageViewPageStyles.container}>
        <View style={imageViewPageStyles.avatar}>
          <Image style={imageViewPageStyles.avatar} source={this.props.sourceIm} />
        </View>
        <View style={imageViewPageStyles.captionContainer}>
          <TextInput style={imageViewPageStyles.textEdit} placeholder="CAPTION" ref='caption' onFocus={() => this.inputFocused.bind(this, 'caption')} onChangeText={(captionText) => this.setState({captionText})}/>
        </View>
        <View style={imageViewPageStyles.buttonContainer}>
          <TouchableHighlight
            style={imageViewPageStyles.button3}
            underlayColor='#9FA8DA'
            onPress={() => this.sendImage()}>
            <Text style={imageViewPageStyles.buttonText}>SEND</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={imageViewPageStyles.button3}
            underlayColor='#9FA8DA'
            onPress={() => this.cancelImage()}>
            <Text style={imageViewPageStyles.buttonText}>CANCEL</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = ImageViewPage;
