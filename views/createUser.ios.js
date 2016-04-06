import React from 'react-native';
import Firebase from 'firebase';
import Geofire from 'geofire';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var UserLogin = require('./userLogin.ios');
var Map = require('./map.ios')
var createUserStyles = require('../stylesheets/createUserStyle.ios')

const {
  Text,
  View,
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
    avatarSource: null,
    avatarJson: null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    errorMessage: null
  };

  addUser() {
    if (this.state.password !== this.state.confirmPassword ) {
      console.log(this.setState({errorMessage: 'Your passwords do not match'}));
    }
    else {
      var that = this;
      var usersRef = new Firebase("https://snapdrop.firebaseio.com/users");
      var ref = new Firebase("https://snapdrop.firebaseio.com");

      ref.createUser({
        email: this.state.email,
        password: this.state.password
      }, function(error, authData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {

          usersRef.push({
            username: that.state.username,
            profileImage: that.state.avatarSource,
            userUID: authData.uid,
            lat: '0',
            long: '0',
          }),

          console.log("-------------------created user--------------------");
          ref.authWithPassword({
            email: that.state.email,
            password: that.state.password
          }, function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
              AlertIOS.prompt("fail",null);
            } else {
              that.props.navigator.push({
                title: 'User Login',
                navigationBarHidden: true,
                component: UserLogin
              });
            }
          }),
          console.log("------------------logging in---------------------");
        }
      })
    }
  }

  goUserLogin() {
    this.props.navigator.push({
      title: 'Login',
      navigationBarHidden: true,
      component: UserLogin
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

     ImagePickerManager.launchCamera(options, (response) => {
       console.log('Response = ', response);

       if (response.didCancel) {
         console.log('User cancelled photo picker');
       }
       else if (response.error) {
         console.log('ImagePickerManager Error: ', response.error);
       }
       else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
       }
       else {
          const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

          var resData = response.data
          console.log('response data')
          console.log(resData)

          var imageData = resData.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\f/g, "").replace(/=/g, "");
          var imagereplaced = imageData.replace(/=/g, "");
          var obj = "data:image/jpeg;base64," + imagereplaced;
          var objJson = JSON.stringify({"obj": imagereplaced})

          this.setState({
            avatarSource: source,
            avatarJson: objJson,
          });
       }
     });
   }
  render() {
    return (
      <View style={createUserStyles.container}>

      <View>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[createUserStyles.avatar, createUserStyles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text style={createUserStyles.text}>SELECT A PHOTO</Text> :
            <Image style={createUserStyles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
      </View>


        <View style={createUserStyles.textInputContainer}>
          <TextInput style={createUserStyles.textEdit} placeholder="USERNAME" autoCapitalize={'none'} onChangeText={(username) => this.setState({username})}/>
          <TextInput style={createUserStyles.textEdit} placeholder="EMAIL" autoCapitalize={'none'} onChangeText={(email) => this.setState({email})}/>
          <TextInput style={createUserStyles.textEdit} secureTextEntry={true} autoCapitalize={'none'} placeholder="PASSWORD" onChangeText={(password) => this.setState({password})}/>
          <TextInput style={createUserStyles.textEdit} secureTextEntry={true} placeholder="CONFIRM PASSWORD" onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>

          <TouchableHighlight style={createUserStyles.button} underlayColor='#F8BBD0' onPress={() => this.addUser()}>
              <Text style={createUserStyles.buttonText}>REGISTER</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={createUserStyles.button}
            underlayColor='#F8BBD0'
            onPress={() => this.goUserLogin()}>

              <Text style={createUserStyles.buttonText}>LOGIN</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }

}

module.exports = createUser;
