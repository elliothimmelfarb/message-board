'use strict';

$(document).ready(init);

function init() {
  $('.post').click(postMsg);
};

function postMsg(event) {
  event.preventDefault();
};
