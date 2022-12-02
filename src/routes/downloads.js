'use strict';

const express = require('express');
const { DownloadModel } = require('../models');
const router = express.Router();


router.get('/download', async (req, res, next) => {
  try {
    const downloads = await DownloadModel.findAll();
    res.status(200).send(downloads);
  } catch (e) {
    next(e)
  }
});

router.post('/download', async (req, res, next) => {
  try{
    const newDownload = await DownloadModel.create(req.body);
    res.status(200).send(newDownload);
  } catch(e) {
    next(e);
  }
  });

//singular!
router.get('/download/:id', async (req, res, next) => {

  const id = req.params.id;
  const oneDownload = await DownloadModel.findOne({ where: { id: id } });
  res.status(200).send(oneDownload);
})




router.put('/download/:id', async (req, res, next) => {
  try {
    const result = await DownloadModel.update(req.body, { where: { id: req.params.id } });
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
});

router.delete('/download/:id', async (req, res, next) => {
  try {
    await DownloadModel.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

module.exports = router;