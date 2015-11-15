// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var zonaSchema = mongoose.Schema({
    name            :String,
    ranking         :Number
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Zona', zonaSchema);
