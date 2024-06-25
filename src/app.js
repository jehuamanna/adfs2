const expressContext = require('@niveus/express-context');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { expressReqid } = require('@niveus/express-reqid');
const errorHandler = require('middlewares/errorHandler');
const apiSpecRouter = require('./apispec/routes');
const apiBaseRouter = require('./api/apiBaseRouter');

const baseURL = process.env.SERVICE_BASE_URL || '/api-service';

const app = express();
app.disable('x-powered-by'); // Disable x-powered-by header in response.

// Security middlewares
app.use(helmet());


// CORS config
const corsOptions = {
  origin: 'https://example.com', // Replace with relevant domains.
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Common Middlewares
app.use(express.json());
app.use(cors(corsOptions));


// Context
app.use(expressContext.expressContextMiddleware());

const reqidOptions = {
  idPrefix: process.env.SERVICE_NAME || 'service-name',
  setInContext: true,
};

app.use(expressReqid(reqidOptions));

// Add request properties to context.
app.use((req, res, next) => {
  const reqPath = req.path;

  expressContext.setMany({ reqPath });

  next();
});


// API docs
app.use(`${baseURL}/api-docs`, apiSpecRouter);

// API base URL
app.use(`${baseURL}/api`, apiBaseRouter);
app.get("/", function(req, res) {
  res.send("Hello World")
})


// Error handler
app.use(errorHandler);

module.exports = app;
