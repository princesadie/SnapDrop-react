/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  Text,
  ListView,
  AlertIOS,
} from 'react-native';


import Firebase from 'firebase'

var list = ['0','2','3','1','2','3','1','2','3','1','2','3','1','2','9'];
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var userRef = new Firebase("https://snapdrop.firebaseio.com/users/0")

class RequestMade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows(list)
    }
  }

  render() {
    return(
      <View>
        <View style={styles.container}>
          <View style={styles.navBar}>
            <Text style={styles.feed}>N</Text>
            <Text style={styles.profile}>P</Text>
          </View>
          <View style={styles.rowContainer}>
            <ListView
              dataSource={this.state.dataSource}
              bounces={true}
              renderRow={(rowData) =>
                <View style={styles.row}>
                  <View>
                    <Text>{rowData}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableHighlight
                      style={styles.button}
                      underlayColor='black'
                      onPress={() => this.goNext()}>
                        <Text>View Request</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={styles.button}
                      underlayColor='black'
                      onPress={() => this.goNext()}>
                        <Text>Complete</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              }
            />
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
    backgroundColor: 'rgba(0,0,0,0)',
  },
  button: {
    marginLeft: -100,
    height: 36,
    backgroundColor: 'black',
  },
  feed: {
    marginTop: 30,
    marginLeft: 30,
  },
  profile: {
    marginTop: 30,
    marginLeft: 290,
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
  },
  rowContainer: {
    marginTop: 30,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
    height: 80,
    margin: 10,
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
    marginTop: 10,
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
    marginTop: 10,
    marginLeft: 250,
    backgroundColor: 'green',
  },
});

module.exports = RequestMade;
