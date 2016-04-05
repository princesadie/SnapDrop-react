/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

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
      <View style={styles.container}>
        <Text>
          Loading fulfillments...
        </Text>
      </View>
    );
  }

  renderFulfillment(fulfillment) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.description}>{fulfillment.description}</Text>
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
        style={styles.listView}
      />
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rightContainer: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  coords: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#fff',
  },
});

module.exports = FulfillRequest;
