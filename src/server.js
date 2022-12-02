'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notFound = require('../error-handlers/404');
const errorHandler = require('../error-handlers/500');
const itemRouter = require('./routes/items');
const downloadRouter = require('./routes/downloads')
const PORT = process.env.PORT || 3002;


const app = express();
app.use(cors());
app.use(express.json());
app.use(itemRouter);
app.use(downloadRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('PROOF OF LIFE');
});


app.use('*', notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log('listening on port', PORT));
}

module.exports = { app, start };