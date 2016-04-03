var RNDBModels = require('react-native-db-models');
var DB = {
  "search_query":new RNDBModels.create_db("search_query")
}
module.exports = RNDBModels