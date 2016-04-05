
var NativeImagePicker = require('./nativeImagePicker.ios')

import React, {
  AppRegistry,
  TouchableHighlight,
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
    var ref = new Firebase("https://snapdrop.firebaseio.com");
    // var authData = ref.getAuth();
    console.log('-------------ugh damn it-----------')
    // console.log(authData.uid)
    this.grabFulfillments('514a0a7f-aa21-4126-a698-4d81130fe963');
  }

  grabFulfillments(inputID) {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com/requests");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        console.log(key);
        var userUID = childSnapshot.val().userUID;
        var childData = childSnapshot.val();
        if (userUID != inputID) {
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



  goToCam(fulfillment) {
      this.props.navigator.push({
        title: 'IMAGE OR VIDEO',
        component: NativeImagePicker,
        passProps: {userID: currentuser, description: fulfillment.description, longitude: fulfillment.longitude, latitude: fulfillment.latitude, requestkey: fulfillment.requestkey}
      });
  }

  renderFulfillment(fulfillment) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.description}>{fulfillment.description}</Text>
          <TouchableHighlight
            style={[styles.bubble, styles.button]}
            underlayColor='#F8BBD0'
            onPress={() => this.goToCam(fulfillment)}>
            <Text style={styles.text}>Fulfill</Text>
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

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderFulfillment.bind(this)}
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
});

module.exports = FulfillRequest;
