import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  Image,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
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
      if(this.state.requestFulfillments.length != 0) {
        return (
            <View style={styles.container}>
              <Text style={styles.notice}>
                LOADING FULFILLMENTS...
              </Text>
            </View>
          );
      } else {
        return (
          <View style={styles.container}>
              <View style={styles.avatar1}>
                <TouchableOpacity onPress={() => this.goBack()}>
                  <Image style = {styles.avatar} source = {require('../images/backArrow.png')}/>
                </TouchableOpacity>
              </View>
              <View style={styles.avatar2}>
                <TouchableOpacity onPress={() => this.goToSnapDropPage()}>
                  <Image style = {styles.avatar} source = {require('../images/snapdrop.png')} />
                </TouchableOpacity>
              </View>
            <Text style={styles.notice}>NO FULFILLMENTS YET</Text>
          </View>
        )
      }
    }

  goToImage(image) {
    this.props.navigator.push({
      component: ViewImage,
      navigationBarHidden: true,
      passProps: {image: image}
    });
  }

  renderRequest(requestFulfillment) {
    return (
      <View>
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.goToImage(requestFulfillment.image.uri)}>
        <Image
          source={{uri: requestFulfillment.image.uri}}
          style={styles.thumbnail}
        />
        </TouchableHighlight>
      </View>
      <View style={styles.pad}>
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
      <View style={styles.navBar}>
          <View style={styles.avatar1}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <Image style = {styles.avatar} source = {require('../images/backArrow.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.avatar2}>
            <TouchableOpacity onPress={() => this.goToSnapDropPage()}>
              <Image style = {styles.avatar} source = {require('../images/snapdrop.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRequest.bind(this)}
          style={styles.listView}
        />
      </View>
    );
  }

}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

var styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(236,64,122,1)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  notice: {
    fontSize: 32,
    color: 'white',
  },
  pad: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  navBar: {
    height: 60,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#EC407A',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
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
  },
  thumbnail: {
    width: 400,
    height: 200,
  },
  listView: {
    height: 1000,
    backgroundColor: 'rgba(236,64,122,1)',
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  avatar1: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  avatar2: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

module.exports = RequestViewPage;
