'use strict';

let host = '//elliots-message-board.herokuapp.com' //'//elliots-message-board.herokuapp.com'

$(document).ready(init);

function init() {
  renderMessages();
  $('.post').click(postMsg);
  $('.messagesArea').on('click', '.delete', deleteMsg);
  $('.messagesArea').on('click', '.edit', editMsg);
};

function editMsg() {
  let id = $(this).parent().parent().parent().parent().data('id');
  $('.modal').modal();
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
  let author = $(this).parent().find('.author').val();
  let text = $(this).parent().find('.text').val();
  $.post(`${host}/msgs`, {author: author, text:text}, (err) => {
    renderMessages()
  })
  .done(() => {

  })
  .fail(err => {
    console.log('post failed')
  })
  .always(()=> {

  });
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
        if (msg.editedtimestamp) $card.find('.time').text(`at ${msg.editedtimestamp}`);
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
