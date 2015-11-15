// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '917936774955717', // your App ID
        'clientSecret'    : '47eb4fe0a543262bb0a53327a1bc0dad', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '592781414011-nfdupkneajnmdoffab6cr80ldmirjgk5.apps.googleusercontent.com',
        'clientSecret'     : 'kM7bXDp7_pBEGonR0_3zW1v4',
        'callbackURL'      : 'http://localhost:3000/auth/google/callback'
    }

};
