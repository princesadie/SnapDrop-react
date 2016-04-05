var React = require('react-native');
var requestMapStyles = require('../stylesheets/requestMapStyle.ios');

var {
  Image,
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

    if (authData) {
      console.log("Authenticated user with uid:", authData.password.email);
      console.log("Authenticated user with uid:", authData.uid);
    }

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
            description: childData.description
          }
          console.log(marker)
          that.state.markers.push(marker);
          console.log(that.state.markers)
        };
      });
    });
  },

  dropMarkers(fullfilment) {
    fulfillments.forEach(function(fulfillment) {
      console.log("GOT THE FULFILLMENTS IN ARRAY")
    })
  },

  componentDidMount() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    console.log('-------------component fucking mounted-----------')
    console.log(authData.uid)
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
    var { markers } = this.state;
    return {
      ...this.state.markers[0],
      latitude: markers[0].coordinate.latitude,
      longitude: markers[0].coordinate.longitude,
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

  goToRequest() {
    this.props.navigator.push({
      navigationBarHidden: true,
      component: RequestDetail
    });
  },

  render() {
    return (
      <View style={requestMapStyles.container}>

        <MapView
          ref="map"
          mapType="terrain"
          style={requestMapStyles.map}
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
                    <Text style={requestMapStyles.text} onPress={this.prompt}>{marker.description}</Text>
                  </CustomCallout>
                </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>

        <View style={requestMapStyles.avatar1}>
          <TouchableOpacity onPress={this.goToUserPage}>
            <Image style = {requestMapStyles.avatar} source = {this.state.userData.profileImage}/>
          </TouchableOpacity>
        </View>
        <View style={requestMapStyles.avatar2}>
          <TouchableOpacity onPress={this.goToSnapDropPage}>
            <Image style = {requestMapStyles.avatar} source = {require('../images/snapdrop.png')} />
          </TouchableOpacity>
        </View>

        <View style={requestMapStyles.buttonContainer}>
          <TouchableOpacity onPress={this.animateRandom} style={[requestMapStyles.bubble, requestMapStyles.button]}>
            <Text style={requestMapStyles.text}>CENTER</Text>
          </TouchableOpacity>
        </View>
      </View>


    );
  },
});

module.exports = RequestMapDisplay;
