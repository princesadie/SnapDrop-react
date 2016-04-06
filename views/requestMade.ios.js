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
  TouchableHighlight,
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
      userData: {},
      test: 'GOT IT?',
    };
  }

  componentDidMount() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    this.grabUserRequests(authData.uid);
    this.grabUsers(authData.uid);
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
grabUsers(inputUID) {
    console.log('------------please god-------------------')
    var that = this;
    var userRef = new Firebase("https://snapdrop.firebaseio.com/users");
    userRef.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var userUID = childSnapshot.val().userUID;
        var childData = childSnapshot.val();
        console.log('------------outside-------------------')
        if (userUID === inputUID) {
          console.log('-------------------------------')
          console.log(childData)
          that.setState({
            userData: childData
          });
        };
      });
    });
  }

  updateUserLocationInFirebase() {
    var userRef = new Firebase("https://snapdrop.firebaseio.com/users/0")
    userRef.update({
      lat: this.state.lastPosition.lat,
      long: this.state.lastPosition.long,
    })
  }
  goToUserPage() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    this.props.navigator.push({
      title: 'User Page',
      navigationBarHidden: true,
      component: UserPage,
      passProps: {userUID: authData.uid}
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
      <TouchableOpacity onPress={() => this.goToRequestPage(userRequest)}>
      <View style={requestMadeStyles.container}>
        <View style={requestMadeStyles.avatar}>
          <View style={requestMadeStyles.avatar}>
            <TouchableOpacity onPress={() => this.goToRequestPage(userRequest)}>
              <Image style = {requestMadeStyles.avatar} source = {require('../images/photoIcon.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={requestMadeStyles.rightContainer}>
          <Text style={requestMadeStyles.description}>{userRequest.description}</Text>
        </View>
      </View>
      </TouchableOpacity>
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
        <View style={requestMadeStyles.navBar}>
          <View style={requestMadeStyles.avatar1}>
            <TouchableOpacity onPress={this.goToUserPage}>
              <Image style = {requestMadeStyles.avatar} source = {this.state.userData.profileImage}/>
            </TouchableOpacity>
          </View>
          <View style={requestMadeStyles.avatar2}>
            <TouchableOpacity onPress={this.goToSnapDropPage}>
              <Image style = {requestMadeStyles.avatar} source = {require('../images/snapdrop.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRequest.bind(this)}
          style={requestMadeStyles.listView}
        />
      </View>

    );
  }
}

module.exports = RequestMade;
