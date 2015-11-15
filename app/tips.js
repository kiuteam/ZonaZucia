var Tip    = require('../app/models/tips');

module.exports = function(app, passport) {


    app.get('/api/tips', isLoggedIn, function(req, res) {
        Tip.find({}, function(err, tips) {
            if (err)
                return res.status(400).send(err);
            res.send(tips);
        }).sort({createDate: 1});
    });

    app.post('/api/tip', isLoggedIn, function(req, res) {
        Tip.findOne({ url :  req.body.url }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return res.status(400).send(err);
            // check to see if theres already a user with that email
            if (user) {
                return res.status(400).send({'Error':'la url ya existe.'});
            } else {
                // create the user
                var newTip     = new Tip();
                newTip.title   = req.body.title;
                newTip.type   = req.body.type;
                newTip.url     = req.body.url;
                newTip.description = req.body.description;
                newTip.save(function(err) {
                    if (err)
                        return res.status(400).send(err);
                    return res.send(newTip);
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
