import React from 'react-native';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var Profile = require('./profile.ios')
import Firebase from 'firebase';
const {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Image,
  NativeModules: {
    ImagePickerManager
  }
} = React;




class userLogin extends React.Component {

  state = {
    email: null,
    password: null
  };

  userLogin() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    ref.authWithPassword({
      email: this.state.email,
      password: this.state.password
    },
    this.props.navigator.push({
      title: 'Profile Page',
      component: Profile
    }), function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    })}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textEdit} placeholder="email" onChangeText={(email) => this.setState({email})}/>
          <TextInput style={styles.textEdit} placeholder="password" onChangeText={(password) => this.setState({password})}/>
          <TouchableHighlight style={styles.button} underlayColor='#9FA8DA' onPress={() => this.userLogin()}>
              <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          <Text style={styles.locationOutput}>
            {this.state.firstName}
          </Text>
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
  button: {
    height: 36,
    width: 300,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#7986CB',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  textEdit: {
    fontWeight: 'bold',
    height: 40,
    width: 300,
    color: 'white',
    borderColor: 'purple',
    backgroundColor: 'pink',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
  },
});

module.exports = userLogin;
