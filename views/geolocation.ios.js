/* eslint no-console: 0 */
'use strict';

var geolocationStyles = require('../stylesheets/geolocationStyle.ios')

import React, {
  Component,
  View,
  MapView,
  TouchableHighlight,
  Text,

} from 'react-native';

import Firebase from 'firebase'

const usersRef = new Firebase("https://snapdrop.firebaseio.com/users");

class Geolocation extends Component {
  watchID = (null: ?number)

  updateUserFirebase() {
    var currentUser = usersRef.child("0");
    currentUser.update({
      long: this.state.lastPosition.long,
      lat: this.state.lastPosition.lat
    });
  }

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
      this.updateUserFirebase();
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={geolocationStyles.container}>
      <Text>LONG: {this.state.initialPosition.long}</Text>
      <Text>LAT: {this.state.initialPosition.lat}</Text>
      <MapView
        style={ geolocationStyles.map }
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
    )
  }
}

module.exports = Geolocation
