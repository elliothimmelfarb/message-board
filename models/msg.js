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
  db.run('update messages set messagetext = ? where id = ?', text, id, cb);
};
