var mongoose = require("mongoose"),
 Schema = mongoose.Schema,
 objectId = mongoose.Schema.ObjectId;

 //========= user details created in the schema  ==========

var userSchema = new Schema({

 
email: { type: String, required: true },
accesstoken: { type: String, required: true },
active: { type: Boolean, required: true },
type: { type: String, required: true },
invitedby: { type: String, required: true },
}
,
{versionKey:false});

 
var invite = mongoose.model('invites', userSchema);

module.exports = invite;