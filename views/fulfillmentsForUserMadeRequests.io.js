/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var fulfillmentsForUserMadeRequestsStyles = require('../stylsheets/fulfillmentsForUserMadeRequestsStyle.ios')
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
      if(this.state.fulfillments.length === 0) {
        return (
          <View style={fulfillmentsForUserMadeRequestsStyles.container}>
              <View style={fulfillmentsForUserMadeRequestsStyles.avatar1}>
                <TouchableOpacity onPress={() => this.goBack()}>
                  <Image style = {fulfillmentsForUserMadeRequestsStyles.avatar} source = {this.state.userData.profileImage}/>
                </TouchableOpacity>
              </View>
              <View style={fulfillmentsForUserMadeRequestsStyles.avatar2}>
                <TouchableOpacity onPress={() => this.goToSnapDropPage()}>
                  <Image style = {fulfillmentsForUserMadeRequestsStyles.avatar} source = {require('../images/snapdrop.png')} />
                </TouchableOpacity>
              </View>
            <Text style={fulfillmentsForUserMadeRequestsStyles.notice}>NO FULFILLMENTS YET :(</Text>
          </View>
        )
      } else {
      return (
          <View style={fulfillmentsForUserMadeRequestsStyles.container}>
            <Text style={fulfillmentsForUserMadeRequestsStyles.notice}>
              LOADING FULFILLMENTS...
            </Text>
          </View>
        );
      }
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
