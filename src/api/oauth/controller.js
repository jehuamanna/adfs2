const logger = require('utils/logger');
const ExpressError = require('utils/expressError');

const oauth = (req, res, next) => {
  try {

    logger.info('Called OAuth endpoint');
    res.send('oauth home')
    return res.sendStatus(200);
  } catch (error) {

    next(new ExpressError());
  }
};

module.exports = {
  oauth,
};
