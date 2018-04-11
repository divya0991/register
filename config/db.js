
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//var connection = mongoose.connect('mongodb://localhost:27017/chatapp'); 

var connection = mongoose.connect('mongodb://divya:divya0991@ds249325.mlab.com:49325/chatdb'); 

  
module.exports = connection;