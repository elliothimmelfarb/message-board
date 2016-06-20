'use strict';

let host = '//localhost:8000' //'//elliots-message-board.herokuapp.com'

$(document).ready(init);

function init() {
  renderMessages();
  $('.post').click(postMsg);
};

function postMsg(event) {
  event.preventDefault();
  let author = $(this).parent().find('.author').val();
  let text = $(this).parent().find('.text').val();
  $.post(`${host}/msgs`, {author: author, text:text}, (err) => {

  });
};

function renderMessages() {
  $.get(`${host}/msgs/allmessages`, msgs => {

  })
    .done(msgs => {
      let $msgs = msgs.map(msg => {
        let $card = $('.template').clone();
        $card.removeClass('template');
        $card.find('.msgAuthor').text(msg.author);
        $card.find('.msgText').text(msg.msgtext);
        $card.find('.time').text(`at ${msg.timestring}`);
        if (msg.editedtimestamp) $card.find('.time').text(`at ${msg.editedtimestamp}`);
        return $card;
      });
      $('.messagesArea').empty().append($msgs);
    })
    .fail(err => {
      console.log(err);
    });
}
