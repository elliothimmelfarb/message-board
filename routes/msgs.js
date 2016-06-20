'use strict';

const express = require('express');
const router = express.Router();
const Msg = require('../models/msg');


router.get('/', (req, res) => {
  Msg.get((err, msgs) => {
    if (err) return res.send(err);
    res.status(err ? 400 : 200).render(err || 'index', {messages:msgs});
  });
});

router.get('/allmessages', (req,res) => {
  Msg.get((err, msgs) => {
    if (err) return res.send(err);
    res.status(err ? 400 : 200).send(err || msgs);
  });
});

router.get('/:id', (req, res) => {
  Msg.getOne(req.params.id, (err, msg) => {
    res.status(err ? 400 : 200).send(err || msg);
  });
});

router.post('/', (req, res) => {
  Msg.create(req.body, err => {
      res.status(err ? 400 : 200).send(err || '');
  });
});

router.delete('/:id', (req, res) => {
  Msg.delete(req.params.id, (err, msgs) => {
      res.status(err ? 400 : 200).send(err || 'all good');
  });
});

router.put('/:id', (req, res) => {
  Msg.edit(req.params.id, req.body.text, req.body.time, err => {
      res.status(err ? 400 : 200).send(err || 'all good');
  });
});




module.exports = router;
