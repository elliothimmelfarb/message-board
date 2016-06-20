'use strict';

const express = require('express');
const router = express.Router();
const Msg = require('../models/msg');


router.get('/', (req, res) => {
  Msg.get((err, msgs) => {
    if (err) return res.send(err);
    res.status(err ? 400 : 200).send(err || msgs);
    //res.render('index');
  });
});

router.get('/:id', (req, res) => {
  Msg.getOne(req.params.id, (err, msg) => {
    res.status(err ? 400 : 200).send(err || msg);
  });
});

router.post('/', (req, res) => {
  Msg.create(req.body, err => {
    if(err) res.status(400).send(err);
    Msg.get((err, msgs) => {
      res.status(err ? 400 : 200).send(err || msgs);
    });
  });
});

router.delete('/:id', (req, res) => {
  Msg.delete(req.params.id, (err, msgs) => {
    if(err) res.status(400).send(err);
    Msg.get((err, msgs) => {
      res.status(err ? 400 : 200).send(err || msgs);
    });
  });
});

router.put('/:id', (req, res) => {
  Msg.edit(req.params.id, req.body.text, err => {
    if(err) res.status(400).send(err);
    Msg.get((err, msgs) => {
      res.status(err ? 400 : 200).send(err || msgs);
    });
  });
});




module.exports = router;
