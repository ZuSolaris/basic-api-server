'use strict';

const { sequelizeDb } = require('./src/models');
const { start } = require('./src/server');

sequelizeDb.sync()
  .then(() => {
    console.log('Successful Connection!');
    start();
  })
  .catch(e => console.error(e));