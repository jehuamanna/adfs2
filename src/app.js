const expressContext = require('@niveus/express-context');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { expressReqid } = require('@niveus/express-reqid');
const errorHandler = require('middlewares/errorHandler');
const apiSpecRouter = require('./apispec/routes');
const apiBaseRouter = require('./api/apiBaseRouter');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const {passport} = require("./middlewares/passport");
const bodyParser = require('body-parser')

const baseURL = process.env.SERVICE_BASE_URL || '/';

const app = express();
app.disable('x-powered-by'); // Disable x-powered-by header in response.

// Security middlewares
app.use(helmet({
  contentSecurityPolicy: false // Disable CSP
}));


// CORS config
const corsOptions = {
  origin: 'http://localhost:1234', // Replace with relevant domains.
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Common Middlewares
app.use(express.json());
app.use(cors(corsOptions));


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

// API docs
app.use(`${baseURL}/api-docs`, apiSpecRouter);

// API base URL
app.use(`/`, apiBaseRouter);

// Error handler
app.use(errorHandler);

module.exports = app;
