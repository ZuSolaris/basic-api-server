'use strict';


const validator = (req, res, next) => {
  let name = req.query.name
  console.log('name is:', req.query.name);
  next()



};

module.exports = logger;