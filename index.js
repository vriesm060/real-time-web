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

/*

  To do:
  ______

  * Show history of chat messages
  * Show information about the users
  *

*/

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/chat', function (req, res) {
  res.render('chat');
});

function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// io.use(function (socket, next) {
//   var username = capitalizeFirstLetter(socket.handshake.query.username);
//   return next();
// });

io.on('connection', function (socket) {
  var username = capitalizeFirstLetter(socket.handshake.query.username);

  console.log(`${username} connected`);

  // socket.on('chat message', function (msg) {
  //   console.log(msg);
  //   io.emit('chat message', {
  //     username: username,
  //     msg: msg
  //   });
  // });



  socket.on('disconnect', function() {
    console.log(`${username} disconnected`);
  });

});

io.of('/chat').on('chat message', function (msg) {
  console.log(msg);
});

http.listen(3000);
