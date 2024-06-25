const passport = require('passport')
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy

const strategy = new OAuth2Strategy({
    authorizationURL: 'https://oneaccess.dtdc.com/adfs/oauth2/authorize',
    tokenURL: 'https://oneaccess.dtdc.com/adfs/oauth2/token',
    clientID: '7ca0da5c-7bef-4fb0-b37d-7e876ced4597', // This is just a UID I generated and registered
    clientSecret: 'ehaWTVjh__PyE3nyARLrNS3UnbFimPks2qU-_yY8', // This is ignored but required by the OAuth2Strategy
    callbackURL: 'https://adfs2.vercel.app/auth',
    pkce: true,
    state: true,
    store: true,

    // callbackURL: 'https://frplus-dev.dtdc.com/auth'

},
    function (accessToken, refreshToken, profile, done) {
        console.log("accessToken", accessToken);
        // console.log("refreshToken", refreshToken);
        // console.log("profile", profile)
        token = accessToken;
        if (refreshToken) {
            // console.log('Received but ignoring refreshToken (truncated)', refreshToken.substr(0, 25));
        } else {
            console.log('No refreshToken received');
        }
        done(null, accessToken);
    });
strategy.authorizationParams = function (options) {
    return {
        //    resource: 'urn:relying:party:trust:identifier' // An identifier corresponding to the RPT
        response_type: "code",
        response_mode: "query",
        scope: "openid"

    };
};
strategy.userProfile = function (accessToken, done) {
    done(null, accessToken);
};


passport.use('oauth2', strategy);
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});


module.exports= {
    passport,
    strategy
}