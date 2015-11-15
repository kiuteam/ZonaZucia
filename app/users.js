var User       = require('../app/models/user');

module.exports = function(app, passport) {

    app.get('/api/users', isLoggedIn, function(req, res) {

        User.find({}, function(err, user) {
            if (err)
                return done(err);
            res.send(user);
        });
    });

    app.get('/api/user/:id', isLoggedIn, function(req, res) {
        console.log(req.params.id);
        User.findOne({_id:req.params.id}, function(err, user) {
            if (err)
                return done(err);
            res.send(user);
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
