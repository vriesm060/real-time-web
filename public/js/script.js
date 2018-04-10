var socket = io();
var m = document.getElementById('m');
var messages = document.getElementById('messages');

// (function () {
//
// }) ();

m.parentNode.addEventListener('submit', function (e) {
  socket.emit('chat message', m.value);
  m.value = '';
  e.preventDefault();
}, false);

socket.on('chat message', function(msg) {
  var li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});
