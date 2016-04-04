var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = React;

var CustomCallout = React.createClass({
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.bubble}>
          <View style={styles.amount}>
            {this.props.children}
          </View>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(236,64,122,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: 'rgba(236,64,122,0.3)',
  },
  dollar: {

    //color: '#FFFFFF',
    //fontSize: 10,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: 'rgba(236,64,122,0.3)',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: 'rgba(236,64,122,0.3)',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = CustomCallout;
