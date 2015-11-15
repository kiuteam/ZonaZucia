var ZonaLocation    = require('../app/models/zonaLocation');
var Zona            = require('../app/models/zona');
var mongoose = require('mongoose');

module.exports = function(app, passport) {

    app.get('/api/posts', isLoggedIn, function(req, res) {
        ZonaLocation.find({}, function(err, posts) {
            if (err)
                return res.status(400).send(err);
            res.send(posts);
        }).sort({createDate: 1});
    });

    app.post('/api/post', isLoggedIn, function(req, res) {
        // create the user
        var newPost         = new ZonaLocation();
        Zona.findOne({name:req.body.zoneName}, function(err, zona) {
            if (err)
                return res.status(400).send(err);
            if (zona) {
                // si la zona ya existe
                newPost.zoneId      = zona._id;
                newPost.zoneName    = req.body.zoneName;
                newPost.description = req.body.description;
                newPost.user        = req.body.user;
                newPost.images      = req.body.images;
                newPost.status      = req.body.status;
                newPost.save(function(err) {
                    if (err)
                        return res.status(400).send(err);
                    var update = {};
                    if(newPost.status){
                        update = { $inc: { ranking: 1 }};
                    } else{
                        update = { $inc: { ranking: -1 }};
                    }
                    Zona.update({ _id: zona._id }, update, {}, function(err, posts) {
                        if (err)
                            return res.status(400).send(err);
                        //console.log(posts)
                    });
                    return res.status(201).send(newPost);
                });
            } else {
                // esto si es una nueva zona
                var newZona            = new Zona();
                newZona.name    = req.body.zoneName;
                if(newPost.status){
                    newZona.ranking = 1;
                } else{
                    newZona.ranking = 0;
                }
                newZona.save(function(err) {
                    if (err)
                        return res.status(400).send(err);
                    newPost.zoneId      = newZona._id;
                    newPost.zoneName    = req.body.zoneName;
                    newPost.description = req.body.description;
                    newPost.user        = req.body.user;
                    newPost.images      = req.body.images;
                    newPost.status      = req.body.status;
                    newPost.save(function(err) {
                        if (err)
                            return res.status(400).send(err);
                        return res.status(201).send(newPost);
                    });
                });
                // if there is a user id already but no token (user was linked at one point and then removed)
            }
        });
    });

    app.get('/api/search/:zoneName', isLoggedIn, function(req, res) {
        ZonaLocation.find({zoneName:req.params.zoneName}, function(err, posts) {
            if (err)
                return res.status(400).send(err);
                // si la zona ya existe
            return res.status(200).send(posts);
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
