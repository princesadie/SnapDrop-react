import React from 'react-native';
import Firebase from 'firebase';

var Map = require('./map.ios')
var userAuthenticationStyles = require('../stylesheets/userAuthenticationStyle.ios');
var ImagePickerManager = require('NativeModules').ImagePickerManager;

const {
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Image,
  AlertIOS,
  DeviceEventEmitter,
  Dimensions,
} = React;

class UserAuthentication extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      registerType: 'login',
      avatarSource: null,
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      errorMessage: null,
      visibleHeight: Dimensions.get('window').height,
    };
  }

  componentDidMount() {
    let self = this;

    DeviceEventEmitter.addListener('keyboardWillShow', function(e: Event) {
      self.keyboardWillShow(e);
    });

    DeviceEventEmitter.addListener('keyboardWillHide', function(e: Event) {
        self.keyboardWillHide(e);
    });
  }

  keyboardWillShow (e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({visibleHeight: newSize});
  }

  keyboardWillHide (e) {
    this.setState({visibleHeight: Dimensions.get('window').height});
  }

  goRegister(){
    this.setState({registerType: 'register'})
  }

  goLogin() {
    this.setState({registerType: 'login'})
  }

  // Scroll a component into view. Just pass the component ref string.
  inputFocused (refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50);
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

          ref.authWithPassword({
            email: that.state.email,
            password: that.state.password
          }, function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
              AlertIOS.prompt("fail",null);
            } else {
              that.setState({registerType: 'login'})
              that.props.navigator.push({
                title: 'Map',
                navigationBarHidden: true,
                component: Map
              });
            }
          })
        }
      })
    }
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
          this.setState({
            avatarSource: source,
          });
       }
     });
   }

  renderLogin() {
    return (
      <View style={userAuthenticationStyles.textInputContainer}>
        <TextInput style={userAuthenticationStyles.textEdit} ref='email' onFocus={() => this.inputFocused.bind(this, 'email')} autoCapitalize={'none'} placeholder="EMAIL" onChangeText={(email) => this.setState({email})}/>
        <TextInput style={userAuthenticationStyles.textEdit} ref='password' onFocus={() => this.inputFocused.bind(this, 'password')} autoCapitalize={'none'} secureTextEntry={true} placeholder="PASSWORD" onChangeText={(password) => this.setState({password})}/>
        <TouchableHighlight style={userAuthenticationStyles.button} underlayColor='#F8BBD0' onPress={() => this.userLoginMethod()}>
            <Text style={userAuthenticationStyles.buttonText}>LOGIN</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={userAuthenticationStyles.button}
          underlayColor='#F8BBD0'
          onPress={() => this.goRegister()}>
            <Text style={userAuthenticationStyles.buttonText}>REGISTER</Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderRegister() {
    return (
      <View>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[userAuthenticationStyles.avatar, userAuthenticationStyles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text style={userAuthenticationStyles.text}>SELECT A PHOTO</Text> :
            <Image style={userAuthenticationStyles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>

        <View style={userAuthenticationStyles.textInputContainer}>
          <TextInput style={userAuthenticationStyles.textEdit} ref='username' onFocus={() => this.inputFocused.bind(this, 'username')} placeholder="USERNAME" autoCapitalize={'none'} onChangeText={(username) => this.setState({username})}/>
          <TextInput style={userAuthenticationStyles.textEdit} ref='email' onFocus={() => this.inputFocused.bind(this, 'email')} placeholder="EMAIL" autoCapitalize={'none'} onChangeText={(email) => this.setState({email})}/>
          <TextInput style={userAuthenticationStyles.textEdit} ref='password' onFocus={() => this.inputFocused.bind(this, 'password')} secureTextEntry={true} autoCapitalize={'none'} placeholder="PASSWORD" onChangeText={(password) => this.setState({password})}/>
          <TextInput style={userAuthenticationStyles.textEdit} ref='pwc' onFocus={() => this.inputFocused.bind(this, 'pwc')} secureTextEntry={true} placeholder="CONFIRM PASSWORD" onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>

          <TouchableHighlight style={userAuthenticationStyles.button} underlayColor='#F8BBD0' onPress={() => this.addUser()}>
              <Text style={userAuthenticationStyles.buttonText}>REGISTER</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={userAuthenticationStyles.button}
            underlayColor='#F8BBD0'
            onPress={() => this.goLogin()}>

              <Text style={userAuthenticationStyles.buttonText}>LOGIN</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    if(this.state.registerType === 'login') {
      return (
        <View style={{height: this.state.visibleHeight}}>
          <View style={userAuthenticationStyles.container}>
            {this.renderLogin()}
          </View>
        </View>
      )
    } else {
      return (
      <View style={{height: this.state.visibleHeight}}>
        <View style={userAuthenticationStyles.container}>
          {this.renderRegister()}
        </View>
      </View>
    )
    }
  }
}

module.exports = UserAuthentication;
