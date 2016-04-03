/* eslint no-console: 0 */
'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  MapView,
  TouchableHighlight,
  Text,

} from 'react-native';

import Firebase from 'firebase'

const usersRef = new Firebase("https://snapdrop.firebaseio.com/users");

class Geolocation extends Component {
  watchID = (null: ?number)

  constructor(props) {
    super(props);
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = {
          long: JSON.stringify(position.coords.longitude),
          lat: JSON.stringify(position.coords.latitude)
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
        long: JSON.stringify(position.coords.longitude),
        lat: JSON.stringify(position.coords.latitude)
      }
      this.setState({
        lastPosition
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  updateUserFirebase() {
    var currentUser = usersRef.child("0");
    currentUser.update({
      long: this.state.lastPosition.long,
      lat: this.state.lastPosition.lat
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>LONG: {this.state.initialPosition.long}</Text>
      <Text>LAT: {this.state.initialPosition.lat}</Text>
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
      <TouchableHighlight
        style={styles.button}
        underlayColor='#9FA8DA'
        onPress={() => this.updateUserFirebase()}>
          <Text style={styles.buttonText}>UPDATE</Text>
      </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#515154',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
});

module.exports = Geolocation
