var React = require('react-native');

var {
  View,
  NativeImagePicker,
  Component,
  Text,
  Image,
  Alert,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  DeviceEventEmitter,
  Dimensions,
  NativeModules: {
    ImagePickerManager
  }
} = React;

var currentView = 'start'
const dismissKeyboard = require('dismissKeyboard')
class FulfillmentViewPage extends Component {

  sendImage() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();

    var fulfillmentsRef = new Firebase("https://snapdrop.firebaseio.com/fulfillments")
    fulfillmentsRef.push({
      requestKey: this.props.requestKey,
      requestImage: this.props.sourceIm,
      caption: this.state.captionText,
      userUID: authData.uid
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
      captionText: '',
      visibleHeight: Dimensions.get('window').height,
      image: this.props.sourceIm,
    };
  }

  componentDidMount() {
  let self = this;

  DeviceEventEmitter.addListener('keyboardWillShow', function(e: Event) {
    self.keyboardWillShow(e);
  });

  DeviceEventEmitter.addListener('keyboardWillHide', function(e: Event) {
      self.keyboardWillHide(e);
  });
}

  render() {
    console.log('------------------------------------------')
    console.log('entered Image View Page')
    console.log(this.props.imageData)
    console.log(this.props.sourceIm)
    console.log('------------------------------------------')
    console.log('------------------------------------------')
    console.log('------------------------------------------')
    console.log('------------------------------------------')
    console.log(this.state.image)
    return (
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
      <View style={{height: this.state.visibleHeight}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image style={styles.canvas} source={this.state.image} />
        </View>
        <View style={styles.captionContainer}>
          <TextInput style={styles.textEdit} placeholderTextColor={'#FFF'} placeholder="CAPTION" ref='caption' onFocus={() => this.inputFocused.bind(this, 'caption')} onChangeText={(captionText) => this.setState({captionText})}/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#9FA8DA'
            onPress={() => this.sendImage()}>
            <Text style={styles.buttonText}>SEND</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#9FA8DA'
            onPress={() => this.cancelImage()}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableHighlight>
        </View>
      </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(236,64,122,1)',
  },
  canvas: {
    resizeMode: 'cover'
  },
  buttonContainer: {
    marginBottom: 40,
  },
  captionContainer: {
    position: 'absolute',
    top: 240,
  },
  button: {
    height: 36,
    width: 300,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  buttonText: {
    color: 'rgba(236,64,122,1)',
    textAlign: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'rgba(236,64,122,1)',
    textAlign: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  text: {
    color: '#FFF'
  },
  textEdit: {
    fontWeight: 'bold',
    height: 40,
    width: 400,
    color: '#FFF',
    borderColor: 'rgba(255,255,255,0.7)',
    backgroundColor: 'rgba(236,64,122,0.3)',
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: -10,
    textAlign: 'center',
    alignItems: 'center',
  },
});

module.exports = FulfillmentViewPage;
