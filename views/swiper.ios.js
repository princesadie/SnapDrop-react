var Swiper = require('react-native-swiper')
// es6
// import Swiper from 'react-native-swiper'
var NewMap = require('./map.ios')
var NativeImagePicker = require('./nativeImagePicker.ios')
var Home = require('./home.ios')

import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  MapView,
  Dimensions,
  TouchableHighlight,
  Text
} from 'react-native';

import Firebase from 'firebase';
import Camera from 'react-native-camera';

class SwiperView extends Component {
  //Create the data that we need, prefill it with an empty object {}
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
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

  takePicture() {
    this.camera.capture();
  }

  componentDidMount() {
    this.listenForUser(this.userRef);
  }

  render() {
    return(
      <Swiper style={styles.style} showsButtons={true} autoplay={false}>
        <View style={styles.slide1}>
          <NewMap/>
        </View>
        <View style={styles.slide2}>
          <NativeImagePicker/>
        </View>

        <View style={styles.slide3}>
          <Home/>
        </View>

        <View style={styles.slide4}>

        </View>

      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide4: {
    flex: 1,
    backgroundColor: '#515154',
  },
  slide3: {
    flex: 1,
    backgroundColor: '#515154',
  },
  slide2: {
    flex: 1,
    backgroundColor: '#EC407A',
  },
  slide1: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  button: {
    flexDirection: 'row',
    height: 40,
    width: 200,
    marginTop: 300,
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
  swiper: {
    color: '#D81B60',
    fontSize: 80,
  },
});

module.exports = SwiperView;
