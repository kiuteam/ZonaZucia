var ZonaLocation    = require('../app/models/zonaLocation');
var Zona            = require('../app/models/zona');
var mongoose = require('mongoose');

module.exports = function(app, passport) {

    app.get('/api/posts', isLoggedIn, function(req, res) {
        ZonaLocation.find({}, function(err, posts) {
            if (err)
                return res.status(400).send(err);
            res.send(posts);
        }).sort({createDate: -1});
    });

    app.post('/api/post', isLoggedIn, function(req, res) {
        // create the user
        var newPost         = new ZonaLocation();
        newPost.zoneId      = req.body.zonaId;
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
                update = { $inc: { ranking: -11 }};
            }
            Zona.update({ _id:  mongoose.Types.ObjectId(req.body.zonaId) }, update, {}, function(err, posts) {
                if (err)
                    return res.status(400).send(err);
                console.log(posts)
            });
            return res.status(201).send(newPost);
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
