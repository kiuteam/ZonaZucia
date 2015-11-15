// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1523739737949318', // your App ID
        'clientSecret'    : '1277bd1258e7e54407343ca3e603eae1', // your App Secret
        'callbackURL'     : 'http://localhost:3001/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:3001/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '592781414011-nfdupkneajnmdoffab6cr80ldmirjgk5.apps.googleusercontent.com',
        'clientSecret'     : 'kM7bXDp7_pBEGonR0_3zW1v4',
        'callbackURL'      : 'http://localhost:3001/auth/google/callback'
    }

};
