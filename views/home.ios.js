/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
// const Firebase = require('firebase');
var CameraView = require('./camera.ios')
var Map = require('./map.ios')
var Profile = require('./profile.ios')

const rootFireRef = new Firebase("https://snapdrop.firebaseio.com");
const users = new Firebase("https://snapdrop.firebaseio.com/users")
const user0Ref = rootFireRef.child('users/0')
const user0UsernameRef = user0Ref.child('/username')
const test = 'maybe?'



rootFireRef.on('value', (snapshot) => {
  const users = snapshot.val();
  // console.log(users);
});

user0Ref.on('value', (snapshot) => {
  const user0 = snapshot.val();
  // console.log(user0);
});

user0UsernameRef.on('value', (snapshot) => {
  const user0Username = snapshot.val();
  // console.log(user0Username);
});


import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  Text

} from 'react-native';

import Firebase from 'firebase';

class Home extends Component {
  //Create the data that we need, prefill it with an empty object {}
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
    this.userRef = this.getRef().child('0');
  }
  //Create a new reference to our database directly accessing USERS
  getRef() {
    return new Firebase("https://snapdrop.firebaseio.com/users");
  }
  //Create listener that'll check in realtime any changes to our USER
  // and pull data as they happen
  listenForUser(userRef) {
    userRef.on('value', (snap) => {
      var user = {
        username: snap.val().username,
        long: snap.val().long,
        lat: snap.val().lat,
      }
  //Our userData is dynamic and so we set its 'state' equal to the data
  // our listener just pulled
      this.setState({
        userData: user
      });

    });
  }
  //Make sure our component mounted and start up our listener
  componentDidMount() {
    this.listenForUser(this.userRef);
  }

  goCamera() {
    this.props.navigator.push({
      title: 'Camera',
      component: CameraView,
      passProps: {dataToBePassed: 'Some data we passed along!'}
    })
  }

  goMap() {
    this.props.navigator.push({
      title: 'Map',
      component: Map,
      passProps: {dataToBePassed: 'Some other data we passed along!'}
    })
  }

  goProfile() {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: {dataToBePassed: 'NEW INFORMATION THAT WE PASSED'}
    })
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goCamera()}>
                <Text style={styles.buttonText}>CAMERA</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goMap()}>
                <Text style={styles.buttonText}>MAP</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goProfile()}>
                <Text style={styles.buttonText}>PROFILE</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.getUser()}>
                <Text style={styles.buttonText}>GET USER</Text>
            </TouchableHighlight>
            <Text style={styles.button}>{this.state.userData.long}</Text>
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
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
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
  buttonContainer:{
    marginTop: 60,
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'column',
    backgroundColor: '#fff',
  },
});

module.exports = Home;
