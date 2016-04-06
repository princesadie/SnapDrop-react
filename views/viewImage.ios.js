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
  PixelRatio,
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
          <View style={styles.avatar2}>
            <TouchableOpacity onPress={() => this.goToSnapDropPage()}>
              <Image style = {styles.avatar} source = {require('../images/snapdrop.png')} />
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

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(236,64,122,1)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  },
  navBar: {
    height: 60,
    marginBottom: 10,
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
  avatar2: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

module.exports = ViewImage;
