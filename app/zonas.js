var Zona    = require('../app/models/zona');
//var mongoose = require('mongoose');

module.exports = function(app, passport) {

    var upload  = require('../app/upload.server');

    //sube una imagen
    app.post('/api/upload', isLoggedIn, upload.create);
    //descarga una inagen
    app.get('/api/upload/:id', isLoggedIn, upload.read);

    //Genera la imagen con georeferenciacion
    app.post('/api/location', isLoggedIn, upload.location);

    app.get('/api/zonas', isLoggedIn, function(req, res) {
        Zona.find({}, function(err, zonas) {
            if (err)
                return res.status(400).send(err);
            res.send(zonas);
        }).sort({ranking: -1});
    });

    app.post('/api/zona', isLoggedIn, function(req, res) {
        Zona.findOne({ name :  req.body.name }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return res.status(400).send(err);
            // check to see if theres already a user with that email
            if (user) {
                return res.status(400).send({'Error':'el Nombre ya existe.'});
            } else {
                // create the user
                var newZona     = new Zona();
                newZona.name    = req.body.name;
                newZona.ranking = 100;
                newZona.save(function(err) {
                    if (err)
                        return res.status(400).send(err);
                    return res.send(newZona);
                });
            }

        });
    });



};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    //res.redirect('/');
    return next();
}
