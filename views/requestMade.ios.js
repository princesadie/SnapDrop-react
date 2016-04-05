/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  TouchableHighlight,
  TouchableOpacity,
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class RequestMade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      userRequests: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.grabUserRequests("6b67698b-3410-4507-ab1f-040b47368b4a");
    this.grabUsers("6b67698b-3410-4507-ab1f-040b47368b4a");
  }

  grabUserRequests(inputUID) {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com/requests");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var userUID = childSnapshot.val().userUID;
        var childData = childSnapshot.val();
        if (userUID === inputUID) {
          that.state.userRequests.push(childData);
          console.log(that.state.userRequests);

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

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading requests...
        </Text>
      </View>
    );
  }

  goTakeImage() {

  }

  renderMovie(userRequest) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.description}>{userRequest.description}</Text>
          <Text style={styles.coords}>{userRequest.long}</Text>
          <Text style={styles.coords}>{userRequest.lat}</Text>
          <Text style={styles.coords}>Made by: {this.state.userData.firstName}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={[styles.bubble, styles.button]}
            underlayColor='#F8BBD0'
            onPress={() => this.goTakeImage()}>
            <Text style={styles.text}>Accept</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
      <View style={styles.avatar1}>
        <TouchableOpacity onPress={this.goToUserPage}>
          <Image style = {styles.avatar} source = {this.state.userData.profileImage}/>
        </TouchableOpacity>
      </View>
      <View style={styles.avatar2}>
        <TouchableOpacity onPress={this.goToSnapDropPage}>
          <Image style = {styles.avatar} source = {require('../images/snapdrop.png')} />
        </TouchableOpacity>
      </View>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    marginBottom: 10,
  },
  rightContainer: {
    flex: 1,
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
    bubble: {
    width: 200,
    backgroundColor: 'rgba(236,64,122,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 95,
  },
  button: {
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
});

module.exports = RequestMade;
