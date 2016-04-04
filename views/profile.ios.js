/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var Deeper = require('./deeper.ios')

import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableHighlight,
  Text

} from 'react-native';

import Firebase from 'firebase'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
    this.userRef = this.getRef().child('0');
    this.imageRef = new Firebase("https://snapdrop.firebaseio.com/users/0/requestImage/uri");
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

  goNext() {
    this.props.navigator.push({
      title: 'One More Down',
      component: Deeper,
      passProps: {dataToBePassed: 'We go one more down the stack', newInformation: this.props.dataToBePassed}
    })
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
      <View>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image style={styles.avatar} source={this.props.sourceIm} />
            <Text style={styles.welcome}>{this.props.dataToBePassed}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.grabCertain('6b67698b-3410-4507-ab1f-040b47368b4a')}>
                <Text style={styles.buttonText}>GO DEEPER</Text>
            </TouchableHighlight>
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
