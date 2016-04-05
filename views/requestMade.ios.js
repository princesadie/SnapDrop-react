/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 var requestMadeStyles = require('../stylesheets/requestMadeStyle.ios');

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

var RequestViewPage = require('./requestViewPage.ios')

class RequestMade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRequests: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      test: 'GOT IT?',
    };
  }

  componentDidMount() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    this.grabUserRequests(authData.uid);
  }

  grabUserRequests(inputUID) {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com/requests");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var userUID = childSnapshot.val().userUID;
        var childData = childSnapshot.val();
        if (userUID === inputUID) {
          var request = {
            description: childSnapshot.val().description,
            lat: childSnapshot.val().lat,
            long: childSnapshot.val().long,
            userUID: childSnapshot.val().userUID,
            requestKey: childSnapshot.key(),
          }
          that.state.userRequests.push(request);

          that.setState({
            dataSource: that.state.dataSource.cloneWithRows(that.state.userRequests),
            loaded: true,
          });

        };
      });
    });
  }

  goToRequestPage(userRequest) {
    this.props.navigator.push({
      component: RequestViewPage,
      passProps: {description: userRequest.description, long: userRequest.long, lat: userRequest.lat, requestKey: userRequest.requestKey}
    });
  };

  renderLoadingView() {
    return (
      <View style={requestMadeStyles.container}>
        <Text>
          LOADING REQUESTS...
        </Text>
      </View>
    );
  }

  renderRequest(userRequest) {
    return (
      <View style={requestMadeStyles.container}>
        <View style={requestMadeStyles.thumbnail}>
          <Text>PENDING</Text>
          <Text onPress={() => this.goToRequestPage(userRequest)}>VIEW PHOTOS</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.description}>{userRequest.description}</Text>
          <Text style={styles.coords}>{userRequest.long}</Text>
          <Text style={styles.coords}>{userRequest.lat}</Text>
          <Text style={styles.coords}>{userRequest.requestKey}</Text>
        </View>
      </View>
    );
  }

  goToUserPage() {
    this.props.navigator.pop({
      title: 'User Page',
      navigationBarHidden: true,
      component: UserPage,
    });
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={requestMadeStyles.main}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRequest.bind(this)}
        style={styles.listView}
      />
      </View>
    );
  }

}

module.exports = RequestMade;
