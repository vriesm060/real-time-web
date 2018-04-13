var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

var numOfPlayers = 0;
var players = ['red', 'yellow'];

io.on('connection', function (socket) {

  var player = players[numOfPlayers];

  // [!] Add something when there are more people connected,
  // like a waiting room or something
  if (numOfPlayers > 2) {
    console.log(`Game room is full, please come back later`);
  } else {
    console.log(`Player ${player} connected`);

    socket.on('add-move', function (id) {
      console.log(id);
      io.emit('add-move', {
        player: player,
        id: id
      });
    });

  }

  numOfPlayers++;

  socket.on('disconnect', function () {
    if (numOfPlayers > 2) {
      console.log(`Bye bye`);
    } else {
      console.log(`Player ${player} disconnected`);
    }
    numOfPlayers--;
  });
});

http.listen(3000);
