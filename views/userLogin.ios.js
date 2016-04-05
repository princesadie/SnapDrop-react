import React from 'react-native';
import Firebase from 'firebase';
// var ImagePickerManager = require('NativeModules').ImagePickerManager;
var Map = require('./map.ios')
// var Register = require('./createUser.ios')

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
  // NativeModules: {
  //   ImagePickerManager
  // }
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
        that.props.navigator.push({
          title: 'Map',
          navigationBarHidden: true,
          component: Map
        });
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textEdit} autoCapitalize={'none'} placeholder="EMAIL" onChangeText={(email) => this.setState({email})}/>
          <TextInput style={styles.textEdit} autoCapitalize={'none'} secureTextEntry={true} placeholder="PASSWORD" onChangeText={(password) => this.setState({password})}/>
          <TouchableHighlight style={styles.button} underlayColor='#F8BBD0' onPress={() => this.userLoginMethod()}>
              <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#F8BBD0'
            onPress={() => this.goRegister()}>
              <Text style={styles.buttonText}>REGISTER</Text>
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
    backgroundColor: 'rgba(236,64,122,1)'
  },
  bubble: {
    width: 200,
    backgroundColor: '#FFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 95,
  },
  button: {
    height: 36,
    width: 300,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  buttonText: {
    color: 'rgba(236,64,122,1)',
    textAlign: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  text: {
    color: '#FFF'
  },
  textEdit: {
    fontWeight: 'bold',
    height: 40,
    width: 300,
    color: 'rgba(236,64,122,1)',
    borderColor: '#FFF',
    backgroundColor: '#f6f6f6',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
});

module.exports = userLogin;
