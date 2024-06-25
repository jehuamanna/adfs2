const oauthRouter = require('express').Router();
const { oauth } = require('./controller');

oauthRouter.get('/', oauth);


module.exports = oauthRouter;
