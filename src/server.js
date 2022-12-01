'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notFound = require('../error-handlers/404');
const errorHandler = require('../error-handlers/500');
const { ItemModel } = require('./models');
const PORT = process.env.PORT || 3002;


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).send('PROOF OF LIFE');
});

app.get('/item', async (req, res, next) => {
  // const items = await User.findAll();
  try {
    const items= await ItemModel.findAll();
    res.status(200).send(items);
  } catch (e) {
    next(e);
  }
});

app.post('/item', async (req, res, next) => {
  try {
    const newItem = await ItemModel.create(req.body);
    res.status(200).send(newItem);
  } catch (e) {
    next(e)
  }
  });



app.use('*', notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log('listening on port', PORT));
}

module.exports = { app, start };