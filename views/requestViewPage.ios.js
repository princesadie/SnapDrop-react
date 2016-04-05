import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  Image,
  PixelRatio,
  TouchableHighlight,
  ListView,
  Navigator,
  Text,
} from 'react-native';

import Firebase from 'firebase';

var ViewImage = require('./viewImage.ios')

class RequestViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestFulfillments: [],
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
    this.grabFulfillmentsBelongingToRequest(this.props.requestKey);
  }

  grabFulfillmentsBelongingToRequest(inputKey) {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com/fulfillments");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var requestKey = childSnapshot.val().requestKey;
        var childData = childSnapshot.val();
        if (requestKey === inputKey) {
          var fulfillment = {
            caption: childSnapshot.val().caption,
            image: childSnapshot.val().requestImage,
            fulfillerUID: childSnapshot.val().userUID
          }
          that.state.requestFulfillments.push(fulfillment);

          that.setState({
            dataSource: that.state.dataSource.cloneWithRows(that.state.requestFulfillments),
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
      <View style={styles.container}>
        <Text>
          LOADING REQUESTS...
        </Text>
      </View>
    );
  }

  goToImage(image) {
    this.props.navigator.push({
      component: ViewImage,
      passProps: {image: image}
    });
  }

  renderRequest(requestFulfillment) {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.goToImage(requestFulfillment.image.uri)}>
        <Image
          source={{uri: requestFulfillment.image.uri}}
          style={styles.thumbnail}
        />
        </TouchableHighlight>
        <View style={styles.rightContainer}>
          <Text style={styles.description}>{requestFulfillment.caption}</Text>
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
        renderRow={this.renderRequest.bind(this)}
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
    backgroundColor: '#FFF',
    padding: 10,
  },
  rightContainer: {
    flex: 1,
  },
  description: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color: 'rgba(236,64,122,1)',
  },
  coords: {
    textAlign: 'center',
    color: 'rgba(236,64,122,1)',
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

module.exports = RequestViewPage;
