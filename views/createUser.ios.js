import React from 'react-native';
var ImagePickerManager = require('NativeModules').ImagePickerManager;

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
    firstName: null,
    lastName: null,
    userName: null,
    password: null
  };

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

          <TextInput style={styles.textEdit} placeholder="first name" onChangeText={(firstName) => this.setState({firstName})}/>
          <TextInput style={styles.textEdit} placeholder="last name" onChangeText={(lastName) => this.setState({lastName})}/>
          <TextInput style={styles.textEdit} placeholder="username" onChangeText={(userName) => this.setState({userName})}/>
          <TextInput style={styles.textEdit} placeholder="password" onChangeText={(password) => this.setState({password})}/>
          <TouchableHighlight style={styles.button} underlayColor='#9FA8DA' onPress={() => this.creatUser()}>
              <Text style={styles.buttonText}>Register</Text>
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
    backgroundColor: '#F5FCFF'
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
    marginLeft: 42,
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
    height: 40,
    width: 300,
    borderColor: 'green',
    backgroundColor: 'orange',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
});

module.exports = createUser;