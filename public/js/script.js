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
  connectFour.checkRows();
});

var connectFour = {
  selectedRows: [],
  selectedCols: [],
  curRow: function (id) {
    return id.slice(1);
  },
  curCol: function (id) {
    return id.slice(0, 1);
  },
  dropDisc: function (disc) {
    var arr = [];

    for (var i = 1; i < 7; i++) {
      // If disc is already in place:
      if (document.getElementById(this.curCol(disc.id) + i).disabled === false) {
        arr.push(i);
      }
    }

    var row = arr[0];
    var col = this.curCol(disc.id);

    this.selectedRows.push(row);
    this.selectedCols.push(col);

    document.getElementById(this.curCol(disc.id) + arr[0]).disabled = true;
    document.getElementById(this.curCol(disc.id) + arr[0]).nextElementSibling.style.backgroundColor = disc.player;
  },
  checkRows: function () {
    console.log(this.selectedRows);

    

  }
};
