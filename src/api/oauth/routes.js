const oauthRouter = require('express').Router();
const { oauth, oauthAuth } = require('./controller');
const {passport} = require("../../middlewares/passport")

oauthRouter.get('/', oauth);
oauthRouter.get("/login", passport.authenticate('oauth2'))
oauthRouter.get("/auth", passport.authenticate('oauth2'), oauthAuth )


module.exports = oauthRouter;
