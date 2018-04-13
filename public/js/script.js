var socket = io();
var checkbox = document.querySelectorAll('.board input');
var h1 = document.querySelector('h1');

checkbox.forEach(function (item) {
  item.addEventListener('click', function () {
    var id = this.getAttribute('id');
    socket.emit('add-move', id);
  }, false);
});

socket.on('add-move', function (disc) {
  connectFour.dropDisc(disc);
});

var connectFour = {
  playerRedMoves: [],
  playerYellowMoves: [],
  curRow: function (id) {
    return Number(id.slice(2));
  },
  curCol: function (id) {
    return Number(id.slice(0, 1));
  },
  dropDisc: function (disc) {
    var arr = [];

    for (var i = 1; i < 7; i++) {
      // If disc is already in place:
      if (document.getElementById(`${this.curCol(disc.id)}.${i}`).disabled === false) {
        arr.push(i);
      }
    }

    var row = arr[0];
    var col = this.curCol(disc.id);
    var space = `${col}.${row}`;

    document.getElementById(space).disabled = true;

    if (disc.player === 'red') {
      this.playerRedMoves.push(space);
      document.getElementById(space).nextElementSibling.style.backgroundColor = '#FF004C';
      if (this.checkMovesHorizontal(space, this.playerRedMoves) >= 3 || this.checkMovesVertical(space, this.playerRedMoves) >= 3) {
        console.log('Red won!');
        h1.textContent = 'Red won!';
      }
    } else {
      this.playerYellowMoves.push(space);
      document.getElementById(space).nextElementSibling.style.backgroundColor = '#FFEE19';
      if (this.checkMovesHorizontal(space, this.playerYellowMoves) >= 3 || this.checkMovesVertical(space, this.playerYellowMoves) >= 3) {
        console.log('Yellow won!');
        h1.textContent = 'Yellow won!';
      }
    }
  },
  checkMovesHorizontal: function (space, playerMoves) {
    var col = this.curCol(space);
    var row = this.curRow(space);

    var left = 0;
    var right = 0;

    for (var i = col - 1; i > 0; i--) {
      if (playerMoves.includes(`${i}.${row}`)) {
        left++;
      } else {
        break;
      }
    }

    for (var i = col + 1; i < 8; i++) {
      if (playerMoves.includes(`${i}.${row}`)) {
        right++;
      } else {
        break;
      }
    }

    var idx = left + right;

    return idx;
  },
  checkMovesVertical: function (space, playerMoves) {
    var col = this.curCol(space);
    var row = this.curRow(space);

    var bottom = 0;
    var top = 0;

    for (var i = row - 1; i > 0; i--) {
      if (playerMoves.includes(`${col}.${i}`)) {
        bottom++;
      } else {
        break;
      }
    }

    for (var i = row + 1; i < 8; i++) {
      if (playerMoves.includes(`${col}.${i}`)) {
        top++;
      } else {
        break;
      }
    }

    var idx = bottom + top;

    return idx;
  }
};
