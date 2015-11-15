// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var tipSchema = mongoose.Schema({
    title       :String,
    url         :String,
    description :String,
    createDate  :{ type: Date, default: Date.now }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Tip', tipSchema);
