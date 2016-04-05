// THIS IS NO LONGER IN USE
var React = require('react-native');
var addCaptionPageStyles = require('../stylesheets/addCaptionPageStyle.ios')
'use strict'
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

// var currentView = 'start'
class addCaptionPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text3: ''
    };
  }

  sendImage() {

  }

  render() {
    console.log('------------------------------------------')
    console.log('entered Caption View Page')
    console.log(this.props.imageData)
    console.log('------------------------------------------')

    return (
      <View style={addCaptionPageStyles.container}>

        <View style={addCaptionPageStyles.avatar}>
          <Image style={addCaptionPageStyles.avatar} source={this.props.sourceIm} />
        </View>

        <View style={addCaptionPageStyles.captionContainer}>
          <TextInput style={addCaptionPageStyles.textEdit} placeholder="enter a location" onChangeText={(text3) => this.setState({text3})}/>

          <Text style={addCaptionPageStyles.locationOutput}>
            {this.state.text3}
          </Text>

          <TouchableHighlight style={addCaptionPageStyles.button} underlayColor='#9FA8DA' onPress={() => this.sendImage()}>
              <Text style={addCaptionPageStyles.buttonText}>Send</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = addCaptionPage;
