var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  var user = [];
  socket.on('test', function(msg) {
    getUsers(msg);
    socket.emit('users', user)
    
    function getUsers(u) {
      user.push(u)
    }
    console.log('a user connected');
    
});
  
  
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
    
  
  
});



http.listen(9000, function(){
  console.log('listening on *:9000');
});