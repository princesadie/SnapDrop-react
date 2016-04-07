/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableHighlight,
  Text,
  TouchableOpacity,
} from 'react-native';

class ViewImage extends Component {
  goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.navBar}>
          <View style={styles.avatar1}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <Image style = {styles.avatar} source = {require('../images/backArrow.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: this.props.image}} />
        </View>
      </View>
    );
  }
}

module.exports = ViewImage;

var styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(236,64,122,1)',
  },
  navBar: {
    height: 60,
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'rgba(236,64,122,1)',
  },
  image: {
    flex: 1,
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  avatar1: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
