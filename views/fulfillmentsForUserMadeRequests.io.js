/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var fulfillmentsForUserMadeRequestsStyles = require('../stylsheets/fulfillmentsForUserMadeRequestsStyle.ios')
import React, {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
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
    this.grabFulfillments("0");
  }

  grabFulfillments(inputID) {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com/fulfillments");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var requestID = childSnapshot.val().requestID;
        var childData = childSnapshot.val();
        if (requestID === inputID) {
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
      <View style={fulfillmentsForUserMadeRequestsStyles.container}>
        <Text>
          Loading fulfillments...
        </Text>
      </View>
    );
  }

  renderFulfillment(fulfillment) {
    return (
      <View style={fulfillmentsForUserMadeRequestsStyles.container}>
        <View style={fulfillmentsForUserMadeRequestsStyles.rightContainer}>
          <Text style={fulfillmentsForUserMadeRequestsStyles.description}>{fulfillment.description}</Text>
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
        style={fulfillmentsForUserMadeRequestsStyles.listView}
      />
    );
  }

}

module.exports = FulfillRequest;
