'use strict';

const express = require('express');
const { ItemModel } = require('../models');
const router = express.Router();

router.get('/item', async (req, res, next) => {

  try {
    const items = await ItemModel.findAll();
    res.status(200).send(items);
  } catch (e) {
    next(e);

  }
});

router.post('/item', async (req, res, next) => {
  try {
    const newItem = await ItemModel.create(req.body);
    res.status(200).send(newItem);
  } catch (e) {
    next(e);
  }
});


//singular item
router.get('/item/:id', async (req, res, next) => {

  const id = req.params.id;
  const oneItem = await ItemModel.findOne({ where: { id: id } });
  res.status(200).send(oneItem);
})


router.put('/item/:id', async (req, res, next) => {
  try {
    const result = await ItemModel.update(req.body, { where: { id: req.params.id } });
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
});

router.delete('/item/:id', async (req, res, next) => {
  try {
    await ItemModel.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

module.exports = router;