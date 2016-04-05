/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var UserPage = require('./userPage.ios.js')
var NativeImagePicker = require('./nativeImagePicker.ios')
var CreateUser = require('./createUser.ios')
var UserLogin = require('./userLogin.ios')
var CameraView = require('./camera.ios')
var Profile = require('./profile.ios')
var homeStyles = require('../stylesheets/homeStyle.ios')

var MapView = require('./map.ios')


import React, {
  Component,
  Image,
  View,
  ListView,
  TouchableHighlight,
  Text,

} from 'react-native';

import Firebase from 'firebase';
class Home extends Component {
  //Create the data that we need, prefill it with an empty object {}
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
    this.userRef = this.getRef().child('0');
    this.imageRef = new Firebase("https://snapdrop.firebaseio.com/users/0/requestImage/uri");
  }
  //Create a new reference to our database directly accessing USERS
  getRef() {
    return new Firebase("https://snapdrop.firebaseio.com/users");
  }
  //Create listener that'll check in realtime any changes to our USER
  // and pull data as they happen
  listenForUser(userRef) {
    userRef.on('value', (snap) => {
      var user = {
        requestImage: snap.val().requestImage.uri,
        username: snap.val().username,
        long: snap.val().long,
        lat: snap.val().lat,
      }
  //Our userData is dynamic and so we set its 'state' equal to the data
  // our listener just pulled
      this.setState({
        userData: user
      });
    });
  }
  //Make sure our component mounted and start up our listener
  componentDidMount() {
    this.listenForUser(this.userRef);
  }

  goCreateUser() {
    this.props.navigator.push({
      title: 'Register',
      component: CreateUser
    })
  }

  goUserLogin() {
    this.props.navigator.push({
      title: 'Login',
      component: UserLogin
    })
  }
  goSearch() {
    console.log('s')
    this.props.navigator.push({
      title: 'SearchBar',
      component: SearchBar,
      passProps: {dataToBePassed: 'Some data we passed along!'}
    })
  }

  goMap() {
    this.props.navigator.push({
      title: 'Map',
      component: MapView,
      passProps: {dataToBePassed: 'Some other data we passed along!'}
    })
  }

  goNativeImagePicker() {
    this.props.navigator.push({
      title: 'IMAGE OR VIDEO',
      component: NativeImagePicker
    })
  }

  goUserPage() {
    this.props.navigator.push({
      title: 'User Page',
      component: UserPage
    })
  }
  log() {
    console.log('I AM CONSOLE LOGGING')
  }

  updateUser() {
    console.log("GOT HERE")
    this.userRef.update({
      long: 'NEW VALUE',
      lat: 'DID IT GET HERE?'
    })
  }


  render() {
    return (
      <View>
        <View style={homeStyles.container}>
          <View style={homeStyles.buttonContainer}>

            <TouchableHighlight
              style={[homeStyles.bubble, homeStyles.button]}
              underlayColor='#F8BBD0'
              onPress={() => this.goUserPage()}>
              <Text style={homeStyles.text}>User Page</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[homeStyles.bubble, homeStyles.button]}
              underlayColor='#F8BBD0'
              onPress={() => this.goCreateUser()}>
                <Text style={homeStyles.text}>Register</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[homeStyles.bubble, homeStyles.button]}
              underlayColor='#F8BBD0'
              onPress={() => this.goUserLogin()}>
                <Text style={homeStyles.text}>Login</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[homeStyles.bubble, homeStyles.button]}
              underlayColor='#F8BBD0'
              onPress={() => this.goMap()}>
                <Text style={homeStyles.text}>MAP</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[homeStyles.bubble, homeStyles.button]}
              underlayColor='#F8BBD0'
              onPress={() => this.goNativeImagePicker()}>
                <Text style={homeStyles.text}>IMAGE PICKER</Text>
            </TouchableHighlight>

          </View>
        </View>
      </View>
    );
  }
}

module.exports = Home;
