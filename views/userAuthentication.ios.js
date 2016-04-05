import React from 'react-native';
import Firebase from 'firebase';
// var ImagePickerManager = require('NativeModules').ImagePickerManager;
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
  // NativeModules: {
  //   ImagePickerManager
  // }
} = React;
// <UserLogin loginType={this.state.registerType}/>
// REg
class UserAuthentication extends React.Component {
constructor(props){
  super(props);
  this.state = {
    registerType: 'login',
    avatarSource: null,
    avatarJson: null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    errorMessage: null
  };
}

  goRegister(){
    this.setState({registerType: 'register'})
    // this.props.navigator.replace({
    //   title: 'User Login',
    //   navigationBarHidden: true,
    //   component: UserLogin
    // });
    // return(<View style={styles.container}><Text>sasdsa</Text></View>)
  }

  goLogin() {
    this.setState({registerType: 'login'})
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
            userUID: authData.uid
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
              that.setState({registerType: 'login'})
              that.props.navigator.push({
                title: 'Map',
                navigationBarHidden: true,
                component: Map
              });
            }
          }),
          console.log("------------------logging in---------------------");
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

  renderLogin() {
    console.log('-------------login-----------------')
    return (
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
    );
  }

  renderRegister() {
    console.log('-------------register-----------------')
    return (
      <View>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text style={styles.text}>SELECT A PHOTO</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <TextInput style={styles.textEdit} placeholder="USERNAME" autoCapitalize={'none'} onChangeText={(username) => this.setState({username})}/>
          <TextInput style={styles.textEdit} placeholder="EMAIL" autoCapitalize={'none'} onChangeText={(email) => this.setState({email})}/>
          <TextInput style={styles.textEdit} secureTextEntry={true} autoCapitalize={'none'} placeholder="PASSWORD" onChangeText={(password) => this.setState({password})}/>
          <TextInput style={styles.textEdit} secureTextEntry={true} placeholder="CONFIRM PASSWORD" onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>

          <TouchableHighlight style={styles.button} underlayColor='#F8BBD0' onPress={() => this.addUser()}>
              <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            underlayColor='#F8BBD0'
            onPress={() => this.goLogin()}>

              <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    if(this.state.registerType === 'login') {
      return (
        <View style={styles.container}>
          {this.renderLogin()}
        </View>
      )
    } else {
      return (
      <View style={styles.container}>
        {this.renderRegister()}
      </View>
    )
    }
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
  avatarContainer: {
    borderColor: '#FFF',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});

module.exports = UserAuthentication;
