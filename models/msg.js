'use strict';

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const sqlite3 = require('sqlite3');

let dbPath = path.join(__dirname, '../data/messages.db');
const db = new sqlite3.Database(dbPath);

db.run(`create table if not exists messages(
  id text,
  author text,
  created real,
  text text,
  edited real
);`);

exports.get = cb => {
  db.all('select * from messages', cb);
};

exports.getOne = (id, cb) => {
  readMsgs((err, msgs) => {
    let msg = msgs.find(obj => {
      return obj.id === id;
    });
    cb(null, msg);
  });
};

exports.create = (author, text, cb) => {
  readMsgs((err, msgs) => {
    let msgObj = {};
    msgObj.author = author;
    msgObj.text = text;
    msgObj.id = uuid();
    msgObj.created = new Date().getTime();
    msgs.push(msgObj);
    writeMsgs(msgs, cb);
  });
};

exports.delete = (id, cb) => {
  readMsgs((err, msgs) => {
    msgs = msgs.filter(obj => {
      return obj.id !== id;
    });
    writeMsgs(msgs, cb);
  });
};

exports.edit = (id, text, cb) => {
  readMsgs((err, msgs) => {
    let msgObj = msgs.find(obj => {
      return obj.id === id;
    });
    msgObj.text = text;
    msgObj.edited = new Date().getTime();
    writeMsgs(msgs, cb);
  });
};


/*
function writeMsgs(msgs, cb) {
  fs.writeFile(dataPath, JSON.stringify(msgs), cb);
}

function readMsgs(cb) {
  fs.readFile(dataPath, (err, data) => {
    if (err) return cb(err);
    try {
      var msgs = JSON.parse(data);
    } catch (e) {
      var msgs = [];
    }
    cb(null, msgs);
  });
}
*/
