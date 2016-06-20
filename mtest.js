'use strict';

const moment = require('moment');

let time = Date.now()

console.log(time);

let formatted = moment.unix(time / 1000).format('h:mm:ss a [on] MMMM Do, YYYY');

console.log(formatted);
