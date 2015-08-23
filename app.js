//var express = require('express'),
//    http = require('http');
//
//var app = express();
//var server = http.createServer(app);
//var io = require('socket.io')(server);

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);

app.get('/', function(request, response) {
  response.render('index.html');
});

server.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log(msg);
    socket.emit('chat message','server response');
  });
  socket.on('message', function (msg) {
    socket.emit('message', msg);
  });
});


