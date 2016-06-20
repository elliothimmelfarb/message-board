'use strict';

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const moment = require('moment');

let dbPath = path.join(__dirname, '../data/messages.db');
const db = new sqlite3.Database(dbPath);

db.run(`create table if not exists messages(
  id TEXT,
  author TEXT,
  timestamp REAL,
  timestring TEXT,
  msgtext TEXT,
  editedtimestamp REAL,
  editedtimestring TEXT
)`);

exports.get = cb => {
  db.all('select * from messages', cb);
};

exports.getOne = (id, cb) => {
  db.all('select * from messages where id = ?', id, cb);
};

exports.create = (message, cb) => {
  if(!message.author || !message.text) return cb({error: 'Missing required field'});
  db.run('insert into messages values (?,?,?,?,?,?,?)',
    uuid(),
    message.author,
    Date.now(),
    moment().format('h:mm:ss a [on] MMMM Do, YYYY'),
    message.text,
    '',
    '',
    cb);
};

exports.delete = (id, cb) => {
  db.run('delete from messages where id = ?', id, cb);
};

exports.edit = (id, text, cb) => {
  db.run('update messages set messagetext = ?, editedtimestamp = ?, editedtimestring = ? where id = ?',
    text,
    Date.now(),
    moment.format('h:mm:ss a [on] MMMM Do, YYYY'),
    id,
    cb);
};
