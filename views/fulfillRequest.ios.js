/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var fulfillRequestStyles = require('../stylesheets/fulfillRequestStyle.ios')

import React, {
  AppRegistry,
  Component,
  ListView,
  Text,
  View,
} from 'react-native';

class FulfillRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fulfillments: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    // console.log(authData.uid)
    this.grabFulfillments(authData.uid);
  }

  grabFulfillments(inputID) {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com/requests");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        console.log(key);
        var userUID = childSnapshot.val().userUID;
        var childData = childSnapshot.val();
        if (userUID != inputID) {
          that.state.fulfillments.push(childData);
          console.log(that.state.fulfillments);

          that.setState({
            dataSource: that.state.dataSource.cloneWithRows(that.state.fulfillments),
            loaded: true,
          });
        };
      });
    });
  }

  renderLoadingView() {
    return (
      <View style={fulfillRequestStyles.container}>
        <Text>
          Loading fulfillments...
        </Text>
      </View>
    );
  }

  renderFulfillment(fulfillment) {
    return (
      <View style={fulfillRequestStyles.container}>
        <View style={fulfillRequestStyles.rightContainer}>
          <Text style={fulfillRequestStyles.description}>{fulfillment.description}</Text>
        </View>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderFulfillment}
        style={fulfillRequestStyles.listView}
      />
    );
  }
}
module.exports = FulfillRequest;
