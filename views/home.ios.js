/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

// var ImageViewPage = require('./imageViewPage.ios')

// var AppleMap = require('./appleMap.ios')
var UserPage = require('./userPage.ios.js')
var NativeImagePicker = require('./nativeImagePicker.ios')
var CreateUser = require('./createUser.ios')
var UserLogin = require('./userLogin.ios')
// const Firebase = require('firebase');
var CameraView = require('./camera.ios')
// var Geolocation = require('./views/geolocation.ios')
var Profile = require('./profile.ios')
var SwiperView = require('./swiper.ios')

var MapView = require('./map.ios')


import React, {
  Component,
  StyleSheet,
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
        <View style={styles.container}>
          <View style={styles.buttonContainer}>

            <TouchableHighlight
              style={[styles.bubble, styles.button]}
              underlayColor='#F8BBD0'
              onPress={() => this.goUserPage()}>
              <Text style={styles.text}>User Page</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.bubble, styles.button]}
              underlayColor='#F8BBD0'
              onPress={() => this.goCreateUser()}>
                <Text style={styles.text}>Register</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goUserLogin()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.bubble, styles.button]}
              underlayColor='#F8BBD0'
              onPress={() => this.goMap()}>
                <Text style={styles.text}>MAP</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.bubble, styles.button]}
              underlayColor='#F8BBD0'
              onPress={() => this.goNativeImagePicker()}>
                <Text style={styles.text}>IMAGE PICKER</Text>
            </TouchableHighlight>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  base64: {
    flex: 1,
    marginTop: 35,
    height: 380,
    borderRadius: 1,
    resizeMode: 'contain',
  },
  avatar: {
    borderRadius: 5,
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
  },
  bubble: {
    width: 200,
    backgroundColor: 'rgba(236,64,122,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 95,
  },
  button: {
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
  },
  buttonContainer:{
    marginTop: 60,
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'column',
    backgroundColor: '#fff',
  },
});

module.exports = Home;
