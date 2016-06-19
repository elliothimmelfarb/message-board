'use strict';

const express = require('express');
const router = express.Router();
const msg = require('../models/msg');


router.get('/', (req, res) => {
  msg.get((err, msgs) => {
    if (err) return res.send(err);
    res.render('index');
  });
});

router.get('/:id', (req, res) => {
  msg.getOne(req.params.id, (err, msg) => {
    res.status(err ? 400 : 200).send(err || msg);
  });
});

router.post('/', (req, res) => {
  msg.create(req.body.author, req.body.text, err => {
    if(err) res.status(400).send(err);
    msg.get((err, msgs) => {
      res.status(err ? 400 : 200).send(err || msgs);
    });
  });
});

router.delete('/:id', (req, res) => {
  msg.delete(req.params.id, (err, msgs) => {
    if(err) res.status(400).send(err);
    msg.get((err, msgs) => {
      res.status(err ? 400 : 200).send(err || msgs);
    });
  });
});

router.put('/:id', (req, res) => {
  msg.edit(req.params.id, req.body.text, err => {
    if(err) res.status(400).send(err);
    msg.get((err, msgs) => {
      res.status(err ? 400 : 200).send(err || msgs);
    });
  });
});




module.exports = router;
