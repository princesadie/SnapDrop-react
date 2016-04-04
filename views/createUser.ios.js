import React from 'react-native';
import Firebase from 'firebase';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var UserLogin = require('./userLogin.ios')
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
  NativeModules: {
    ImagePickerManager
  }
} = React;


class createUser extends React.Component {

  state = {
    avatarSource: null,
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
      var ref = new Firebase("https://snapdrop.firebaseio.com");
      ref.createUser({
        email: this.state.email,
        password: this.state.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          that.props.navigator.replace({
            title: 'Map',
            component: Map,
          });
        }
      })
    }
  }

  goUserLogin() {
    this.props.navigator.replace({
      title: 'Login',
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
         // You can display the image using either:
         const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
         // const source = {uri: response.uri.replace('file://', ''), isStatic: true};
         console.log('---------------------------------')
         this.setState({
           avatarSource: source
         });
       }
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


        <View style={styles.textInputContainer}>
          <TextInput style={styles.textEdit} placeholder="email" autoCapitalize={'none'} onChangeText={(email) => this.setState({email})}/>
          <TextInput style={styles.textEdit} secureTextEntry={true} autoCapitalize={'none'} placeholder="password" onChangeText={(password) => this.setState({password})}/>
          <TextInput style={styles.textEdit} secureTextEntry={true} placeholder="confirm password" onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>

          <TouchableHighlight style={styles.button} underlayColor='#9FA8DA' onPress={() => this.addUser()}>
              <Text style={styles.buttonText}>Register</Text>
          </TouchableHighlight>

          <Text style={styles.text}>Already have an account?</Text>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#9FA8DA'
            onPress={() => this.goUserLogin()}>

              <Text style={styles.buttonText}>Login</Text>
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
  bubble: {
    width: 200,
    backgroundColor: 'rgba(236,64,122,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 95,
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
  text: {
    color: 'black'
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
