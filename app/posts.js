var ZonaLocation    = require('../app/models/zonaLocation');
var Zona            = require('../app/models/zona');

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
        console.log(req.body);
        var newPost         = new ZonaLocation();
        newPost.zoneId      = req.body.zoneId;
        newPost.description = req.body.description;
        newPost.user        = req.body.user;
        newPost.images      = req.body.images;
        newPost.save(function(err) {
            if (err)
                return res.status(400).send(err);
            //Zona.

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
