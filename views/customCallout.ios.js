var React = require('react-native');
var customCalloutStyles = require('../stylesheets/calloutStyle.ios');
var {
  View,
  Text,
} = React;

var CustomCallout = React.createClass({
  render() {
    return (
      <View style={[customCalloutStyles.container, this.props.style]}>
        <View style={customCalloutStyles.bubble}>
          <View style={customCalloutStyles.amount}>
            {this.props.children}
          </View>
        </View>
      </View>
    );
  },
});

module.exports = CustomCallout;
