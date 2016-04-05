var NativeImagePicker = require('./nativeImagePicker.ios')
var React = require('react-native');
var AddCaptionPage = require('./addCaptionPage.ios')

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
  TextInput,
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
  constructor(props) {
    super(props)
    this.state = {
      captionText: ''
    };
  }

  render() {
    console.log('------------------------------------------')
    console.log('entered Image View Page')
    // console.log(this.props.imageData)
    console.log(this.props.cat)
    console.log('------------------------------------------')
    return (
      <View style={styles.container}>

        <View style={styles.avatar}>
          <Image style={styles.avatar} source={this.props.sourceIm} />
        </View>
        <View style={styles.captionContainer}>
          <TextInput style={styles.textEdit} placeholder="add a caption" onChangeText={(captionText) => this.setState({captionText})}/>
        </View>
        <View style={styles.buttonContainer3}>
          <TouchableHighlight
            style={styles.button3}
            underlayColor='#9FA8DA'
            onPress={() => this.sendImage()}>
            <Text style={styles.buttonText3}>Send</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button3}
            underlayColor='#9FA8DA'
            onPress={() => this.cancelImage()}>
            <Text style={styles.buttonText3}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'pink',
  },
  avatar: {
    borderRadius: 5,
    flex: 1
  },
  button3: {
    flex: 1,
    width: 150,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#7986CB',
  },
  buttonText3: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer3:{
    flexDirection:'row',
    backgroundColor: '#fff',
    marginTop: 0
  },
  textEdit: {
    height: 40,
    marginBottom: 0,
    borderColor: 'green',
    backgroundColor: 'orange',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
});

module.exports = ImageViewPage;
