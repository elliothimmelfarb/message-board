'use strict';


const PORT = process.env.PORT || 8000;

//////////// REQUIRES //////////////////
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const request = require('request');

//////////// APP DECLARATION //////////////////
let app = express();

//////////// APP CONFIGURATION //////////////////
app.set('view engine', 'pug');

//////////// GENERAL PURPOSE MIDDLEWARE //////////////////
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

//////////// ROUTES //////////////////
app.get('/', (req, res) => {
  res.send("Message Board!");
});

//////////// APP LISTEN //////////////////
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
