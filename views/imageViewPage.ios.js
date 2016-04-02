// var NativeImagePicker = require('./nativeImagePicker.ios')
// var React = require('react-native');

// var {
//   View,
//   NativeImagePicker,
//   Component,
//   Text,
//   Image,
//   Alert,
//   ListView,
//   StyleSheet,
//   ScrollView,
//   TouchableHighlight,
//   TouchableOpacity,
//   NativeModules: {
//     ImagePickerManager
//   }
// } = React;

// class ImageViewPage extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       avatarSource: null
//     };
//   }

//   selectPhotoTapped(item) {
//     const options = {
//       title: 'Photo Picker',
//       quality: 0.5,
//       maxWidth: 300,
//       maxHeight: 300,
//       storageOptions: {
//         skipBackup: true
//     }
//   };



//   render() {
//     return (
//       <View>
//         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
//               {participation.image_url == "https://pixabay.com/static/uploads/photo/2015/10/01/21/39/background-image-967820_960_720.jpg" ?
//                 <Text>{this.missingPhotoIcon(participation)}</Text> :
//                   <Image style={styles.avatar} source={{uri: participation.image_url}} />
//               }
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 200,
//     flexDirection: 'column',
//   },
//   content: {
//     flex: 1,
//     height: 50,
//     flexDirection: 'column',
//     marginTop: 200,
//   },


// });

// module.exports = ImageViewPage;
