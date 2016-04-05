import React from 'react-native';
var userLoginStyles = require('../stylesheets/userLoginStyle.ios');
import Firebase from 'firebase';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var Map = require('./map.ios')
var Register = require('./createUser.ios')

const {
  Text,
  View,
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

  goRegister() {
    this.props.navigator.popN(1)
  }


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
        that.props.navigator.resetTo({
          title: 'Map',
          navigationBarHidden: true,
          component: Map
        });
      }
    })}

  render() {
    return (
      <View style={userLoginStyles.container}>
        <View style={userLoginStyles.textInputContainer}>
          <TextInput style={userLoginStyles.textEdit} autoCapitalize={'none'} placeholder="EMAIL" onChangeText={(email) => this.setState({email})}/>
          <TextInput style={userLoginStyles.textEdit} autoCapitalize={'none'} secureTextEntry={true} placeholder="PASSWORD" onChangeText={(password) => this.setState({password})}/>
          <TouchableHighlight style={userLoginStyles.button} underlayColor='#F8BBD0' onPress={() => this.userLoginMethod()}>
              <Text style={userLoginStyles.buttonText}>LOGIN</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={userLoginStyles.button}
            underlayColor='#F8BBD0'
            onPress={() => this.goRegister()}>
              <Text style={userLoginStyles.buttonText}>REGISTER</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

module.exports = userLogin;
