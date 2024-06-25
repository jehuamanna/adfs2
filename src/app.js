require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('middlewares/errorHandler');
const apiSpecRouter = require('./apispec/routes');
const apiBaseRouter = require('./api/apiBaseRouter');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const {passport} = require("./middlewares/passport");
const bodyParser = require('body-parser')
const { oauth, oauthAuth, oauthRedirect } = require('./api/oauth/controller');
const baseURL = process.env.SERVICE_BASE_URL || '/';

const app = express();

// Security middlewares




// Common Middlewares
app.use(cors());


const https = require('https');
https.globalAgent.options.rejectUnauthorized = false;

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))


// Context
// app.use(expressContext.expressContextMiddleware());

// const reqidOptions = {
//   idPrefix: process.env.SERVICE_NAME || 'service-name',
//   setInContext: true,
// };

// app.use(expressReqid(reqidOptions));

// Add request properties to context.
// app.use((req, res, next) => {
//   const reqPath = req.path;

//   expressContext.setMany({ reqPath });

//   next();
// });

app.use(cookieParser());
app.use(passport.initialize());
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));

// app.use(`/`, apiBaseRouter);

app.get('/', oauth);
app.get("/login", passport.authenticate('oauth2'))
app.get("/auth", passport.authenticate('oauth2'), oauthAuth )
app.get("/redirect", oauthRedirect )

// Error handler
app.use(errorHandler);

module.exports = app;
