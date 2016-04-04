import React from 'react-native';
import Firebase from 'firebase';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var Profile = require('./profile.ios')
var Map = require('./map.ios')

const {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Image,
  AlertIOS,
  NativeModules: {
    ImagePickerManager
  }
} = React;

class userLogin extends React.Component {

  state = {
    email: null,
    password: null
  };

  userLoginMethod() {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    ref.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        AlertIOS.prompt("fail",null);
      } else {
        that.props.navigator.replace({
          title: 'Your Profile',
          component: Profile,
        });
      }
    })}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textEdit} autoCapitalize={'none'} placeholder="email" onChangeText={(email) => this.setState({email})}/>
          <TextInput style={styles.textEdit} autoCapitalize={'none'} secureTextEntry={true} placeholder="password" onChangeText={(password) => this.setState({password})}/>
          <TouchableHighlight style={styles.button} underlayColor='#9FA8DA' onPress={() => this.userLoginMethod()}>
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
