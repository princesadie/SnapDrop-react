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
  render() {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: this.props.image}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  }
});

module.exports = ViewImage;
