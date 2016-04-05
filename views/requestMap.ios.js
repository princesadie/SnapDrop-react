var React = require('react-native');
var {
  Image,
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  AlertIOS,
} = React;

import Firebase from 'firebase';
var MapView = require('react-native-maps');
var { width, height } = Dimensions.get('window');
var CustomCallout = require('./customCallout.ios');
var UserPage = require('./userPage.ios');
var RequestMade = require('./requestMade.ios')
var RequestDetail = require('./requestDetail.ios')

const ASPECT_RATIO = width / height;
const LATITUDE = 41.889357;
const LONGITUDE = -87.637604;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

var RequestMapDisplay = React.createClass({
  watchID: (null: ?number),
  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      request: {},
      test: "FUCK",
      fulfillments: [],
      userData: {},
    };
  },

  grabUserRequests(inputUID) {
    var that = this;
    var userRef = new Firebase("https://snapdrop.firebaseio.com/users");
    userRef.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var userUID = childSnapshot.val().userUID;
        var childData = childSnapshot.val();
        if (userUID === inputUID) {
          that.setState({
            userData: childData
          });
        };
      });
    });
  },

  updateUserLocationInFirebase() {
    var userRef = new Firebase("https://snapdrop.firebaseio.com/users/0")
    userRef.update({
      lat: this.state.lastPosition.lat,
      long: this.state.lastPosition.long,
    })
  },

  getUserDetails() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
  },

  grabFulfillments(inputID) {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com/requests");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var userUID = childSnapshot.val().userUID;
        var childData = childSnapshot.val();
        if (userUID != inputID) {
          that.state.fulfillments.push(childData);
          var marker = {
            key: id++,
            coordinate:{
              latitude: childData.lat,
              longitude: childData.long,
            },
            description: childData.description,
            requestKey: childSnapshot.key(),
          }
          that.state.markers.push(marker);
        };
      });
    });
  },

  componentDidMount() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    this.grabUserRequests(authData.uid);
    this.grabFulfillments(authData.uid);

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
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 5000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = {
        long: parseFloat(position.coords.longitude),
        lat: parseFloat(position.coords.latitude)
      }
      this.setState({
        lastPosition
      });
      this.updateUserLocationInFirebase();
    });
     this.getUserDetails();
  },

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  onRegionChange(region) {
    this.setState({ region });
  },

  jumpRandom() {
    this.setState({ region: this.goToMarker() });
  },

  animateRandom() {
    if(this.state.markers[0] != null) {
      this.refs.map.animateToRegion(this.goToMarker());
    }
  },

  goToMarker() {
    var { userData } = this.state;
    return {
      latitude: userData.lat,
      longitude: userData.long,
    };
  },

  updateMarkerCoordinate(e) {
    this.setState({
      markers: [
        ...this.state.markers[0],
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: 'rgba(236,64,122,1)',
        },
      ],
    })
    console.log(this.state.markers[0].key)
    console.log(this.state.markers)
  },

  goToRequest(marker) {
    this.props.navigator.push({
      navigationBarHidden: true,
      component: RequestDetail,
      passProps: {requestKey: marker.requestKey, requestCoordinate: marker.coordinate, requestDescription: marker.description}
    });
  },

  render() {
    return (
      <View style={styles.container}>

        <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
        >
        {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
              onDragEnd={this.updateMarkerCoordinate}>
                <MapView.Callout tooltip>
                  <CustomCallout>
                    <Text style={styles.text} onPress={() => this.goToRequest(marker)}>{marker.description}</Text>
                  </CustomCallout>
                </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>

        <View style={styles.avatar1}>
          <TouchableOpacity onPress={this.goToUserPage}>
            <Image style = {styles.avatar} source = {this.state.userData.profileImage}/>
          </TouchableOpacity>
        </View>
        <View style={styles.avatar2}>
          <TouchableOpacity onPress={this.goToSnapDropPage}>
            <Image style = {styles.avatar} source = {require('../images/snapdrop.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.animateRandom} style={[styles.bubble, styles.button]}>
            <Text style={styles.text}>CENTER</Text>
          </TouchableOpacity>
        </View>
      </View>


    );
  },
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  callout: {
    backgroundColor: 'rgba(236,64,122,0.7)',
  },
  bubble: {
    backgroundColor: 'rgba(236,64,122,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 140,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  avatar1: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  avatar2: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  text: {
    color: 'white',
  },
});

module.exports = RequestMapDisplay;
