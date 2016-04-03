/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
// const Firebase = require('firebase');
var CameraView = require('./camera.ios')
// var Map = require('./map.ios')
// var Geolocation = require('./views/geolocation.ios')
var Profile = require('./profile.ios')
var SwiperView = require('./swiper.ios')

import React, {
  Component,
  StyleSheet,
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

  goCamera() {
    this.props.navigator.push({
      title: 'Camera',
      component: CameraView,
      passProps: {dataToBePassed: 'Some data we passed along!'}
    })
  }

  goMap() {
    this.props.navigator.push({
      title: 'Map',
      component: Map,
      passProps: {dataToBePassed: 'Some other data we passed along!'}
    })
  }

  goProfile() {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: {dataToBePassed: 'NEW INFORMATION THAT WE PASSED'}
    })
  }

  goSwiper() {
    this.props.navigator.push({
      title: 'Home with Swipe',
      component: SwiperView
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
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goCamera()}>
                <Text style={styles.buttonText}>CAMERA</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goMap()}>
                <Text style={styles.buttonText}>MAP</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goProfile()}>
                <Text style={styles.buttonText}>PROFILE</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.log()}>
                <Text style={styles.buttonText}>LOG</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goSwiper()}>
                <Text style={styles.buttonText}>SWIPE VIEW</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.updateUser()}>
                <Text style={styles.buttonText}>UPDATE USER DATA</Text>
            </TouchableHighlight>
            <Text style={styles.welcome}>{this.state.userData.long}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    width: 300,
    marginTop: 20,
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

module.exports = Home;
