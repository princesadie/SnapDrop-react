/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var CameraView = require('./camera.ios')
var AppleMap = require('./appleMap.ios')
var GoogleMap = require('./googleMap.ios')
var Profile = require('./profile.ios')
var SearchBar = require('./searchBar.ios')

import React, {
  Component,
  StyleSheet,
  View,
  TouchableHighlight,
  Text

} from 'react-native';

class Home extends Component {
  goCamera() {
    this.props.navigator.push({
      title: 'Camera',
      component: CameraView,
      passProps: {dataToBePassed: 'Some data we passed along!'}
    })
  }

  goSearch() {
    console.log('s')
    this.props.navigator.push({
      title: 'SearchBar',
      component: SearchBar,
      passProps: {dataToBePassed: 'Some data we passed along!'}
    })
  }

  goAppleMap() {
    this.props.navigator.push({
      title: 'AppleMap',
      component: AppleMap,
      passProps: {dataToBePassed: 'Some other data we passed along!'}
    })
  }

  goGoogleMap() {
    this.props.navigator.push({
      title: 'GoogleMap',
      component: GoogleMap,
      passProps: {dataToBePassed: 'Some other data we passed along!'}
    })
  }

  goProfile() {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: {dataToBePassed: 'NEW INFORMATION THAT WE PASSED'}
    })
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goCamera()}>
                <Text style={styles.buttonText}>CAMERA</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goAppleMap()}>
                <Text style={styles.buttonText}>Apple MAP</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goGoogleMap()}>
                <Text style={styles.buttonText}>GOOGLE MAP</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goProfile()}>
                <Text style={styles.buttonText}>PROFILE</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              underlayColor='#9FA8DA'
              onPress={() => this.goSearch()}>
                <Text style={styles.buttonText}>Search Bar Biatch</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
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
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonContainer:{
    marginTop: 60,
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'column',
    backgroundColor: '#fff',
  },
});

module.exports = Home;
