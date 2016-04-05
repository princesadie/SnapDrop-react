var React = require('react-native')
var userPageStyles = require('../stylesheets/userPageStyle.ios');

var {
  Component,
  Dimensions,
  View,
  Image,
  TouchableHighlight,
  Navigator,
  Text,
} = React;

import Firebase from 'firebase';

var FulfillRequest = require('./fulfillRequest.ios');
var MadeRequest = require('./requestMade.ios');
// var HomeSplash = require('./homeSplash.ios');
var RequestMap = require('./requestMap.ios');
// var CreateUser = require('./createUser.ios');

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
    // this.props.navigator.pop({
    //   title: 'Map',
    //   navigationBarHidden: true,
    // });
    this.props.navigator.popN(1)
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
      component: MadeRequest,
      navigationBarHidden: true,
    })
  }

  logOut(){
    console.log("logging out");
    var ref = new Firebase("https://snapdrop.firebaseio.com/users");
    ref.unauth();
    // this.props.navigator.resetTo({
    //   title: 'Map',
    //   navigationBarHidden: true,
    //   component: CreateUser
    // });
    this.props.navigator.popN(2);
  }

  render() {
    return (
      <View style={userPageStyles.container2}>
        <View style={userPageStyles.container2}>
          <View style={userPageStyles.content2}>
            <Image style={userPageStyles.avatar2} source={this.state.userData.profileImage}/>

            <View style={userPageStyles.buttonContainer2}>
              <TouchableHighlight
                style={userPageStyles.button2}
                underlayColor='#F8BBD0'
                onPress={() => this.madeRequest()}>
                  <Text style={userPageStyles.buttonText2}>MY REQUESTS</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={userPageStyles.button2}
                underlayColor='#F8BBD0'
                onPress={() => this.fulfillRequest()}>
                  <Text style={userPageStyles.buttonText2}>FULFILL REQUESTS</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={userPageStyles.button2}
                underlayColor='#F8BBD0'
                onPress={() => this.makeRequest()}>
                  <Text style={userPageStyles.buttonText2}>MAKE A REQUEST</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={userPageStyles.button2}
                underlayColor='#F8BBD0'
                onPress={() => this.logOut()}>
                  <Text style={userPageStyles.buttonText2}>LOG OUT</Text>
              </TouchableHighlight>

            </View>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = UserPage;
