/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  ListView,
  TouchableHighlight,
  Text,
  AlertIOS,
} from 'react-native';

import Firebase from 'firebase'

class FulfillRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fulfillments: [],
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false
    };
  }

  grabFulfillments(inputDescription) {
    var that = this;
    var ref = new Firebase("https://snapdrop.firebaseio.com/fulfillments");
    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var description = childSnapshot.val().description;
        if (description === inputDescription) {
          that.state.fulfillments.push(childData);
          console.log(that.state.fulfillments);
          that.setState({
            dataSource: that.state.dataSource.cloneWithRows(that.state.fulfillments), loaded: true
          })
        };
      });
    });
  }

  componentDidMount() {
    this.grabFulfillments("I took this from the Southeast corner");
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView dataSource={this.state.dataSource} renderRow={this.state.renderFullfillments} style={styles.listlistView} />
    )
    return(
      <View>
        <View style={styles.container}>

          <View style={styles.content}>
            <Text>{{}}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.welcome}>Fullfill Request</Text>
            <Text style={styles.welcome}>{seed[0]}</Text>
          </View>

          <View style={styles.buttonContainer}>
            {seed.map(function(index) {
              return (
                <TouchableHighlight
                  key={seed[index]}
                  style={styles.button}
                  onPress={() => this.goCamera()}>
                    <Text style={styles.buttonText}>{seed[index]}</Text>
                </TouchableHighlight>
              )
            })}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    height: 50,
    flexDirection: 'column',
    marginTop: 200,
  },
  welcome: {
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    width: 300,
    marginTop: 100,
    marginLeft: 42,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#7986CB',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonContainer:{
    marginTop: 60,
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'column',
    backgroundColor: '#fff',
  },
});

module.exports = FulfillRequest;
