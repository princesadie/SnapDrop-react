import React from 'react-native';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
import Firebase from 'firebase';
var UserLogin = require('./userLogin.ios')
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


class createUser extends React.Component {
  state = {
    email: null,
    password: null
  };

  addUser() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    ref.createUser({
      email: this.state.email,
      password: this.state.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid)
      }
    })}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textEdit} placeholder="email" onChangeText={(email) => this.setState({email})}/>
          <TextInput style={styles.textEdit} placeholder="password" onChangeText={(password) => this.setState({password})}/>
          <TouchableHighlight style={styles.button} underlayColor='#9FA8DA' onPress={() => this.addUser()}>
              <Text style={styles.buttonText}>Register</Text>
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

module.exports = createUser;
