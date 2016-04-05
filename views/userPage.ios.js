var userPageStyles = require('../stylesheets/userPageStyle.ios');

import React, {
  Component,
  Dimensions,
  View,
  StyleSheet,
  Image,
  PixelRatio,
  TouchableHighlight,
  Navigator,
  Text,
} from 'react-native';

import Firebase from 'firebase';

var FulfillRequest = require('./fulfillRequest.ios');
var MadeRequest = require('./requestMade.ios');
var HomeSplash = require('./homeSplash.ios');
var RequestMap = require('./requestMap.ios');

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }

  componentDidMount() {
    this.grabUserRequests(this.currentUser().uid);
  }

  currentUser() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    return ref.getAuth();
  }

  grabUserRequests(inputUID) {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com/users");
    ref.once("value", function(snapshot) {
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
  }

  makeRequest(){
    console.log("made a req");
    this.props.navigator.pop({
      title: 'Map',
      navigationBarHidden: true,
    });
  }

  fulfillRequest(){
    this.props.navigator.push({
      component: RequestMap
    })
  }

  madeRequest(){
    console.log("fullfill a req");
    this.props.navigator.push({
      title: 'YOUR REQUESTS',
      component: MadeRequest
    })
  }

  logOut(){
    console.log("fullfill a req");
    this.props.navigator.popToTop({
      navigationBarHidden: true,
      component: HomeSplash
    })
  }

  render() {
    return (
      <View style={userPageStyles.container}>
        <View style={userPageStyles.container}>
          <View style={userPageStyles.content}>
            <Image style={userPageStyles.avatar} source={this.state.userData.profileImage}/>

            <View style={userPageStyles.buttonContainer}>
              <TouchableHighlight
                style={userPageStyles.button}
                underlayColor='#F8BBD0'
                onPress={() => this.madeRequest()}>
                  <Text style={userPageStyles.buttonText}>MY REQUESTS</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={userPageStyles.button}
                underlayColor='#F8BBD0'
                onPress={() => this.fulfillRequest()}>
                  <Text style={userPageStyles.buttonText}>FULFILL REQUESTS</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={userPageStyles.button}
                underlayColor='#F8BBD0'
                onPress={() => this.makeRequest()}>
                  <Text style={userPageStyles.buttonText}>MAKE A REQUEST</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={userPageStyles.button}
                underlayColor='#F8BBD0'
                onPress={() => this.logOut()}>
                  <Text style={userPageStyles.buttonText}>LOG OUT</Text>
              </TouchableHighlight>

            </View>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = UserPage;
