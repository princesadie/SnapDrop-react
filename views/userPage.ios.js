import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
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
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image style={styles.avatar} source={this.state.userData.profileImage}/>

            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={styles.button}
                underlayColor='#F8BBD0'
                onPress={() => this.madeRequest()}>
                  <Text style={styles.buttonText}>MY REQUESTS</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.button}
                underlayColor='#F8BBD0'
                onPress={() => this.fulfillRequest()}>
                  <Text style={styles.buttonText}>FULFILL REQUESTS</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.button}
                underlayColor='#F8BBD0'
                onPress={() => this.makeRequest()}>
                  <Text style={styles.buttonText}>MAKE A REQUEST</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.button}
                underlayColor='#F8BBD0'
                onPress={() => this.logOut()}>
                  <Text style={styles.buttonText}>LOG OUT</Text>
              </TouchableHighlight>

            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column',
   backgroundColor: 'rgba(236,64,122,1)',
 },
 content: {
   flex: 1,
   height: 50,
   flexDirection: 'column',
   marginTop: 30,
   backgroundColor: 'rgba(236,64,122,1)',
 },
 welcome: {
   marginTop: 20,
   textAlign: 'center',
 },
 button: {
   flex: 1,
   flexDirection: 'row',
   height: 36,
   width: 300,
   marginTop: 30,
   marginLeft: 42,
   borderRadius: 10,
   justifyContent: 'center',
   backgroundColor: '#FFF',
 },
 buttonText: {
   color: 'rgba(236,64,122,1)',
   textAlign: 'center',
   marginTop: 10,
   fontWeight: 'bold',
 },
 buttonContainer:{
   marginTop: 10,
   paddingTop:30,
   paddingBottom:10,
   flexDirection:'column',
   backgroundColor: 'rgba(236,64,122,1)',
 },
 avatar: {
   borderRadius: 100,
   width: 200,
   height: 200,
   marginLeft: 85,
   borderWidth: 3 / PixelRatio.get(),
   borderColor: '#FFF',
 },
});

module.exports = UserPage;
