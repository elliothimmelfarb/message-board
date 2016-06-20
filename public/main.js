'use strict';

let host = '//elliots-message-board.herokuapp.com'

$(document).ready(init);

function init() {
  renderMessages();
  $('.post').click(postMsg);
  $('.messagesArea').on('click', '.delete', deleteMsg);
  $('.messagesArea').on('click', '.edit', editMsg);
  $('.accept').click(accept);
  $('.cancel').click(cancel);
};

function cancel(event) {
  event.preventDefault();
  $('.modal').modal('toggle');
}

function accept(event) {
  event.preventDefault();
  let newText = $('.editText').val();
  console.log(newText);
  let id = $('.modal').data('id');
  let time = Date.now();
  $.ajax({
    url: `${host}/msgs/${id}`,
    type: 'PUT',
    data: {text: newText, time: time},
    success: function() {
      renderMessages();
      $('.modal').modal('toggle');
    },
    fail: function() {
      console.log('fail!');
    }
  });
}

function editMsg() {
  let $t = $(this)
  let id = $t.parent().parent().parent().parent().data('id');
  let text = $t.parent().parent().parent().find('.msgText').text();
  console.log(text);
  $('.modal').data('id', id).modal();
  $('.editText').val(text);
}

function deleteMsg() {
  let id = $(this).parent().parent().parent().parent().data('id');
  $.ajax({
    url: `${host}/msgs/${id}`,
    type: 'DELETE',
    success: function() {
      renderMessages();
    }
  });
}

function postMsg(event) {
  event.preventDefault();
  console.log('post!');
  let $t = $(this);
  let author = $t.parent().find('.author').val();
  $t.parent().find('.author').val('');
  let text = $t.parent().find('.text').val();
  $t.parent().find('.text').val('');
  let time = Date.now();
  $.post(`${host}/msgs`, {author: author, text: text, time: time}, (err) => {
    renderMessages()
  })
  .fail(err => {
    console.log('post failed')
  })
};

function renderMessages() {
  let $template = $('.template');
  $.get(`${host}/msgs/allmessages`)
    .done(msgs => {
      let $msgs = msgs.map(msg => {
        let $card = $template.clone();
        $card.removeClass('template');
        $card.find('.msgAuthor').text(msg.author);
        $card.find('.msgText').text(msg.msgtext);
        $card.find('.time').text(`at ${msg.timestring}`);
        $card.data('id', msg.id);
        if (msg.editedtimestamp) $card.find('.edited').text(`edited at ${msg.editedtimestring}`);
        return $card;
      });
      $msgs.reverse()
      $('.messagesArea').empty().append($msgs);
      console.log('rendered!')
    })
    .fail(err => {
      console.log(err);
    });
}
