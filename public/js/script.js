var socket = io();
var m = document.getElementById('m');
var messages = document.getElementById('messages');

m.parentNode.addEventListener('submit', function (e) {
  socket.emit('chat message', m.value);
  m.value = '';
  e.preventDefault();
}, false);

socket.on('chat message', function(msg) {
  var li = document.createElement('li');
  li.textContent = `${msg.username}: ${msg.msg}`;
  messages.appendChild(li);
});
