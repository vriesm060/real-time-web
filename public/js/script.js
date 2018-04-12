var socket = io();
var checkbox = document.querySelectorAll('.board input');

checkbox.forEach(function (item) {
  item.addEventListener('click', function () {
    var id = this.getAttribute('id');
    socket.emit('add-move', id);
  }, false);
});

socket.on('add-move', function (move) {
  document.getElementById(move.id).nextElementSibling.style.backgroundColor = move.player;
});
