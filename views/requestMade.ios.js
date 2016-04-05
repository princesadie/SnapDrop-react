/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

class RequestMade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRequests: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    console.log('-------------ugh damn it-----------')
    console.log(authData.uid)
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

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading requests...
        </Text>
      </View>
    );
  }

  renderMovie(userRequest) {
    return (
      <View style={styles.container}>
        <View style={styles.thumbnail}>
          <Text>PENDING</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.description}>{userRequest.description}</Text>
          <Text style={styles.coords}>{userRequest.long}</Text>
          <Text style={styles.coords}>{userRequest.lat}</Text>
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
      <View style={styles.main}>
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
  main: {
    backgroundColor: 'rgba(236,64,122,1)',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#C2185B',
    padding: 10,
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
    width: 65,
    height: 80,
  },
  listView: {
    height: 1000,
    paddingTop: 20,
    backgroundColor: 'rgba(236,64,122,1)',
  },
  navBar: {
    flex: 1,
    height: 60,
  },
  avatar1: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  avatar2: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  avatar1: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  avatar2: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
});

module.exports = RequestMade;
