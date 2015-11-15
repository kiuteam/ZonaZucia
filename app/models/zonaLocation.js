// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var zonaLocationSchema = mongoose.Schema({
    zoneId          :mongoose.Schema.Types.ObjectId,//id de la zona
    description     :String,
    user            :mongoose.Schema.Types.Mixed,//{userId'':name:'',email:''}
    images          :mongoose.Schema.Types.Mixed,// {location:{image:'id1',latitude:'',longitude:''},image:'idImagen'}
    createDate      :{ type: Date, default: Date.now }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('ZonaLocation', zonaLocationSchema);
