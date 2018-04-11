var mongoose = require("mongoose"),
 Schema = mongoose.Schema,
 objectId = mongoose.Schema.ObjectId;

 //========= user details created in the schema  ==========

var userSchema = new Schema({

 
 email: { type: String, required: true },
 name: { type: String, required: true },
  pwd: { type: String, required: true },
   accesstoken: { type: String, required: true },
    active: { type: Boolean, required: true },
    phone: { type: String, required: true }
   
}
,
{versionKey:false});

 
var user = mongoose.model('users', userSchema);

module.exports = user;