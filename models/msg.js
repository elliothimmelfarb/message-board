'use strict';

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const sqlite3 = require('sqlite3').verbose();

let dbPath = path.join(__dirname, '../data/messages.db');
const db = new sqlite3.Database(dbPath);

db.run(`create table if not exists messages(
  id TEXT,
  author TEXT,
  timestamp REAL,
  messagetext TEXT,
  editedtime Real
)`);

exports.get = cb => {
  db.all('select * from messages', cb);
};

exports.getOne = (id, cb) => {
  db.all('select * from messages where id = ?', id, cb);
};

exports.create = (message, cb) => {
  db.run('insert into messages values (?,?,?,?,?)', uuid(), message.author, Date.now(), message.text, '', cb);
};

exports.delete = (id, cb) => {
  db.run('delete from messages where id = ?', id, cb);
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
