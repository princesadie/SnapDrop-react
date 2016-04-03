// THIS IS NO LONGER IN USE
var React = require('react-native');
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
      <View style={styles.container}>

        <View style={styles.avatar}>
          <Image style={styles.avatar} source={this.props.sourceIm} />
        </View>

        <View style={styles.captionContainer}>
          <TextInput style={styles.textEdit} placeholder="enter a location" onChangeText={(text3) => this.setState({text3})}/>

          <Text style={styles.locationOutput}>
            {this.state.text3}
          </Text>

          <TouchableHighlight style={styles.button} underlayColor='#9FA8DA' onPress={() => this.sendImage()}>
              <Text style={styles.buttonText}>Send</Text>
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
  },
  avatar: {
    borderRadius: 5,
    width: 350,
    height: 350
  },
  button: {
    flex: 1,
    height: 30,
    width: 150,
    marginTop: 20,
    marginLeft: 42,
    borderRadius: 10,
    flexDirection: 'row',
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
  textEdit: {
    height: 40,
    borderColor: 'green',
    backgroundColor: 'orange',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
});

module.exports = addCaptionPage;
