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
const dismissKeyboard = require('dismissKeyboard')

var FulfillRequest = require('./fulfillRequest.ios');
var MadeRequest = require('./requestMade.ios');
var RequestMap = require('./requestMap.ios');

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }

  componentDidMount() {
    this.grabUsers(this.currentUser().uid);
    dismissKeyboard();
  }

  currentUser() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    return ref.getAuth();
  }

  grabUsers(inputUID) {
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
    this.props.navigator.popN(1)
  }

  fulfillRequest(){
    this.props.navigator.push({
      component: RequestMap,
      navigationBarHidden: true,
    })
  }

  madeRequest(){
    this.props.navigator.push({
      component: MadeRequest,
      navigationBarHidden: true,
    })
  }

  logOut(){
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    console.log('----------------------------------')
    console.log("logging out");
    console.log(ref.getAuth());
    console.log('----------------------------------')
    ref.unauth();
    console.log('----------------------------------')
    console.log(ref.getAuth());
    console.log('----------------------------------')
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
            <Text style={userPageStyles.username}>{this.state.userData.username}</Text>
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
