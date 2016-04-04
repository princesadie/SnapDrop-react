/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import Firebase from 'firebase';
var ImagePickerManager = require('NativeModules').ImagePickerManager;

import React, {
  Component,
  StyleSheet,
  Dimensions,
  Image,
  View,
  Image,
  TouchableHighlight,
  Text,
  PixelRatio,
  TouchableOpacity,

} from 'react-native';

import Firebase from 'firebase'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.email = this.getUserDetails();
  }
  getUserDetails() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();

    return authData.password.email;
  }

  goUserRequests() {
    this.props.navigator.push({
      title: 'Your Requests',
      component: GoUserRequests
    })
  }

  goFulfill() {
    this.props.navigator.push({
      title: 'Fulfill Requests',
      component: GoFulfill
    })
  }

  makeRequest(){
    console.log("made a req");
    this.props.navigator.pop({
      title: 'Map',
      component: Map
    })
  }

  selectPhotoTapped() {
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

  grabCertain(inputUID) {
    var ref = new Firebase("https://snapdrop.firebaseio.com/requests");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var userUID = childSnapshot.val().userUID;
        var childData = childSnapshot.val();
        if (userUID === inputUID) {
          console.log(childData);
          return true
        };
      });
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource} />
            }
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#9FA8DA'
            onPress={() => this.goUserRequests()}>
              <Text style={styles.buttonText}>View Your Requests</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#9FA8DA'
            onPress={() => this.goFulfill()}>
              <Text style={styles.buttonText}>{this.email}</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  content: {
    flex: 1,
    height: 50,
    flexDirection: 'column',
    marginTop: 200,
  },
  welcome: {
    textAlign: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    width: 300,
    marginTop: 100,
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

module.exports = Profile;
