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
  TouchableOpacity,
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

    var ref = new Firebase("https://snapdrop.firebaseio.com");
    var authData = ref.getAuth();
    console.log('-------------ugh damn it-----------')
    console.log(authData.uid)
    // this.grabUserRequests(authData.uid);
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
        <View style={styles.thumbnail}>
          <Text>PENDING</Text>
        </View>
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
    flexDirection: 'column',
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
