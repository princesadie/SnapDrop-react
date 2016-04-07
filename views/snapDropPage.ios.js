/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 var snapDropPageStyles = require('../stylesheets/snapDropPageStyle.ios');

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

var FulfillmentViewPage = require('./fulfillmentViewPage.ios')
var ViewImage = require('./viewImage.ios')

class SnapDropPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFulfillments: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      userData: {},
      test: 'GOT IT?',
    };
  }

  componentDidMount() {
    this.grabAllFulfillments();
  }

  grabAllFulfillments() {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com/fulfillments");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();

          var request = {
            caption: childSnapshot.val().caption,
            requestImage: childSnapshot.val().requestImage,
          }
          that.state.userFulfillments.push(request);

          that.setState({
            dataSource: that.state.dataSource.cloneWithRows(that.state.userFulfillments),
            loaded: true,
          });
      });
    });
  }

  renderLoadingView() {
    return (
      <View style={snapDropPageStyles.container}>
        <Text style={snapDropPageStyles.notice}>
          LOADING REQUESTS...
        </Text>
      </View>
    );
  }

  goToImage(image) {
    this.props.navigator.push({
      component: ViewImage,
      navigationBarHidden: true,
      passProps: {image: image}
    });
  }

  renderRequest(userFulfillment) {
    return (
      <View>
        <View style={snapDropPageStyles.container}>
          <TouchableHighlight onPress={() => this.goToImage(userFulfillment.requestImage.uri)}>
          <Image
            source={{uri: userFulfillment.requestImage.uri}}
            style={snapDropPageStyles.thumbnail}
          />
          </TouchableHighlight>
        </View>
        <View style={snapDropPageStyles.pad}>
          <Text style={snapDropPageStyles.description}>{userFulfillment.caption}</Text>
        </View>
      </View>
    );
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={snapDropPageStyles.main}>
        <View style={snapDropPageStyles.navBar}>
          <View style={snapDropPageStyles.avatar1}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <Image style = {snapDropPageStyles.avatarBack} source = {require('../images/backArrow.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRequest.bind(this)}
          style={snapDropPageStyles.listView}
        />
      </View>
    );
  }
}
module.exports = SnapDropPage;
