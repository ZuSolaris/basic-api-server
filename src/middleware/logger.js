'use strict';

const logger = (req, res, next) => {
  req.timestamp = new Date();
  console.log('logged at:', req.timestamp);
  next();
};
module.exports = logger;