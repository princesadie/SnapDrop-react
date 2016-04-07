var React = require('react-native');
var requestMapStyles = require('../stylesheets/requestMapStyle.ios');
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var FulfillmentViewPage = require('./fulfillmentViewPage.ios');

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

  goNext2(imageData, sourceIm, marker) {
    this.props.navigator.push({
      title: 'Image Details',
      component: FulfillmentViewPage,
      navigationBarHidden: true,
      passProps: {imageData: imageData.obj, sourceIm: sourceIm, requestKey: marker.requestKey, requestCoordinate: marker.coordinate, requestDescription: marker.description}
    })
  },

  selectPhotoTapped(marker) {
    const options = {
      title: 'Photo Picker',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      },
      allowsEditing: true
  };

    ImagePickerManager.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        // const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        console.log('---------------------------------')
        // this.setState({
        //   avatarSource: source
        // });

        // console.log(response.data)
        var resData = response.data
        console.log('response data')
        console.log(resData)

        var imageData = resData.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\f/g, "").replace(/=/g, "");
        console.log('image data')
        console.log(imageData)

        var imagereplaced = imageData.replace(/=/g, "");
        console.log('image data replaced')
        console.log(imagereplaced)

        var obj = "data:image/jpeg;base64," + imagereplaced;
        console.log('obj')
        console.log(obj)

        var objJson = JSON.stringify({"obj": obj})
        console.log('json obj')
        console.log(objJson)
        console.log('---------------------------------')

        this.goNext2(objJson, source, marker);
      }
    });
  },

  grabUserRequests(inputUID) {
    var that = this;
    var userRef = new Firebase("https://snapdrop.firebaseio.com/users");
    userRef.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var userUID = childSnapshot.val().userUID;
        var childData = childSnapshot.val();
        if (userUID === inputUID) {
          var user = {
            lat: childSnapshot.val().lat,
            long: childSnapshot.val().long,
            profileImage: childSnapshot.val().profileImage,
            userUID: childSnapshot.val().userUID,
            username: childSnapshot.val().username,
            key: childSnapshot.key(),
          }
          that.setState({
            userData: user
          });
        };
      });
    });
  },

  updateUserLocationInFirebase() {
    var userRef = new Firebase("https://snapdrop.firebaseio.com/users/"  + this.state.userData.key)
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

  animateRandom() {
      this.refs.map.animateToRegion(this.goToMarker());
  },

  goToMarker() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    this.grabUserRequests(authData.uid)
    var { userData } = this.state;
    return {
      ...this.state.userData,
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

  goBack() {
    this.props.navigator.pop();
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
                    <Text style={requestMapStyles.text} onPress={() => this.selectPhotoTapped(marker)}>{marker.description}</Text>
                  </CustomCallout>
                </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>

        <View style={requestMapStyles.avatar1}>
          <TouchableOpacity onPress={() => this.goBack()}>
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
            <Text style={requestMapStyles.text}>FIND ME</Text>
          </TouchableOpacity>
        </View>
      </View>


    );
  },
});

module.exports = RequestMapDisplay;
