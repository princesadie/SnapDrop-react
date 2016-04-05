var React = require('react-native');
var mapStyles = require('../stylesheets/mapStyle.ios');

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

var MapDisplay = React.createClass({
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
      userData: {},
    };
  },

  grabUserRequests(inputUID) {
    console.log('------------please god-------------------')
    var that = this;
    var userRef = new Firebase("https://snapdrop.firebaseio.com/users");
    userRef.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var userUID = childSnapshot.val().userUID;
        var childData = childSnapshot.val();
        console.log('------------outside-------------------')
        if (userUID === inputUID) {
          console.log('-------------------------------')
          console.log(childData)
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

  componentDidMount() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    console.log('-------------component fucking mounted-----------')
    console.log(authData.uid)
    this.grabUserRequests(authData.uid);

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

  onMapPress(e) {
    if(this.state.markers.length < 1) {
      this.setState({
        markers: [
          ...this.state.markers,
          {
            coordinate: e.nativeEvent.coordinate,
            key: id++,
            title: 'PIN',
            description: 'DESCRIPTION',
            color: 'rgba(236,64,122,1)',
          },
        ],
      });
      console.log(e.nativeEvent.coordinate)
    }
  },

  sendRequestToFireBase() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();

    var requestsRef = new Firebase("https://snapdrop.firebaseio.com/requests");
    requestsRef.push({
      description: this.state.request.description,
      lat: this.state.markers[0].coordinate.latitude,
      long: this.state.markers[0].coordinate.longitude,
      userUID: authData.uid
    })
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

  saveResponse(promptValue) {
    this.setState({
      request: {
        lat: this.state.markers[0].coordinate.latitude,
        long: this.state.markers[0].coordinate.longitude,
        description: promptValue
      }
    });
  },

  sendRequest() {
    //if no pin we need to make a pop up
    // if description is empty we should just pass empty string
    this.sendRequestToFireBase();
    this.props.navigator.push({
      title: 'REQUESTS MADE',
      component: RequestMade
    });

  },

  goToUserPage() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    this.props.navigator.push({
      title: 'User Page',
      navigationBarHidden: true,
      component: UserPage,
      passProps: {userUID: authData.uid}
    });
  },

  prompt() {
    AlertIOS.prompt('WRITE DESCRIPTION', null, this.saveResponse)
  },

  render() {
    return (
      <View style={mapStyles.container}>

        <MapView
          ref="map"
          mapType="terrain"
          style={mapStyles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          onPress={this.onMapPress}
          showsUserLocation={true}
        >
        {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
              onDragEnd={this.updateMarkerCoordinate}
              // onSelect={() => AlertIOS.prompt('WRITE DESCRIPTION', null, this.saveResponse)}
              draggable>
                <MapView.Callout tooltip>
                  <CustomCallout>
                    <Text style={mapStyles.text} onPress={this.prompt}>{this.state.markers[0].coordinate.latitude.toPrecision(7)},{this.state.markers[0].coordinate.longitude.toPrecision(7)}</Text>
                  </CustomCallout>
                </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>

        <View style={mapStyles.avatar1}>
          <TouchableOpacity onPress={this.goToUserPage}>
            <Image style = {mapStyles.avatar} source = {this.state.userData.profileImage}/>
          </TouchableOpacity>
        </View>
        <View style={mapStyles.avatar2}>
          <TouchableOpacity onPress={this.goToSnapDropPage}>
            <Image style = {mapStyles.avatar} source = {require('../images/snapdrop.png')} />
          </TouchableOpacity>
        </View>

        <View style={mapStyles.buttonContainer}>
          <TouchableOpacity onPress={this.sendRequest} style={[mapStyles.bubble, mapStyles.button]}>
            <Text style={mapStyles.text}>SEND</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.animateRandom} style={[mapStyles.bubble, mapStyles.button]}>
            <Text style={mapStyles.text}>CENTER</Text>
          </TouchableOpacity>
        </View>
      </View>


    );
  },
});



module.exports = MapDisplay;
