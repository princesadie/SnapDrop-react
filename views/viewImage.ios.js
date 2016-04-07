/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 var viewImageStyles = require('../stylesheets/viewImageStyle.ios')
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

module.exports = ViewImage;
