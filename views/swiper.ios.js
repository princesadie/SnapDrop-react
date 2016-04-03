var Swiper = require('react-native-swiper')
// es6
// import Swiper from 'react-native-swiper'

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

var markers = [
  {
    latitude: 41.890731,
    longitude: -87.637604,
    title: 'My Pin',
    subtitle: 'Sweet Info Here'
  }
];

import Camera from 'react-native-camera';

class SwiperView extends Component {
  watchID = (null: ?number)
  //Create the data that we need, prefill it with an empty object {}
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      initialPosition: 'unknown',
      lastPosition: 'unknown'
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

  updateUserFirebase() {
    var currentUser = this.userRef;
    currentUser.update({
      long: this.state.lastPosition.long,
      lat: this.state.lastPosition.lat
    });
  }

  componentDidMount() {
    this.listenForUser(this.userRef);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = {
          long: parseFloat(position.coords.longitude),
          lat: parseFloat(position.coords.latitude)
        }
        this.setState({
          initialPosition
        })
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = {
        long: parseFloat(position.coords.longitude),
        lat: parseFloat(position.coords.latitude)
      }
      this.setState({
        lastPosition
      });
      this.updateUserFirebase();
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return(
      <Swiper style={styles.wrapper} showsButtons={true}>

        <View style={styles.slide1}>
          <Text style={styles.buttonText}>SWIPE RIGHT FOR CAMERA AND LEFT FOR MAP</Text>
        </View>

        <View style={styles.slide2}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          </Camera>
        </View>

        <View style={styles.slide3}>
          <MapView
            style={ styles.map }
            initialRegion={{
              latitude: this.state.initialPosition.lat,
              longitude: this.state.initialPosition.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            annotations={[{
              latitude: this.state.lastPosition.lat,
              longitude: this.state.lastPosition.long,
              title: 'PRINCESADIE',
              subtitle: 'You are here'
            }]
            }
            region={{
              latitude: this.state.initialPosition.lat,
              longitude: this.state.initialPosition.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>

        <View style={styles.slide4}>
          <Text style={styles.row}>USERNAME: {this.state.userData.username}</Text>
          <Text style={styles.row}>LONG: {this.state.lastPosition.long}</Text>
          <Text style={styles.row}>LAT: {this.state.lastPosition.lat}</Text>
        </View>

      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide4: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#515154',
  },
  slide3: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#515154',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
    flex: 1,
    flexDirection: 'row',
    height: 36,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    marginTop: 7,
  },
});

module.exports = SwiperView;
