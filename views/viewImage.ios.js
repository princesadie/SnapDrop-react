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
  render() {
    return (
      <View style={viewImageStyles.imageContainer}>
        <Image style={viewImageStyles.image} source={{uri: this.props.image}} />
      </View>
    );
  }
}
module.exports = ViewImage;
