var socket = io();
var checkbox = document.querySelectorAll('.board input');

checkbox.forEach(function (item) {
  item.addEventListener('click', function () {
    var id = this.getAttribute('id');
    socket.emit('add-move', id);
  }, false);
});

socket.on('add-move', function (disc) {
  connectFour.dropDisc(disc);
  // connectFour.checkRows();
});

var connectFour = {
  playerRedMoves: [],
  playerYellowMoves: [],
  curRow: function (id) {
    return id.slice(2);
  },
  curCol: function (id) {
    return id.slice(0, 1);
  },
  dropDisc: function (disc) {
    var arr = [];

    for (var i = 1; i < 7; i++) {
      // If disc is already in place:
      // console.log(document.getElementById(this.curCol(disc.id)));
      if (document.getElementById(`${this.curCol(disc.id)},${i}`).disabled === false) {
        arr.push(i);
      }
    }

    var row = arr[0];
    var col = this.curCol(disc.id);
    var space = `${col},${row}`;

    document.getElementById(space).disabled = true;

    if (disc.player === 'red') {
      this.playerRedMoves.push(space);
      document.getElementById(space).nextElementSibling.style.backgroundColor = '#FF004C';
    } else {
      this.playerYellowMoves.push(space);
      document.getElementById(space).nextElementSibling.style.backgroundColor = '#FFEE19';
    }

    console.log(`Player red moves: ${this.playerRedMoves}`);
    console.log(`Player yellow moves: ${this.playerYellowMoves}`);
  }
};
