var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(9000, function(){
  console.log('listening on *:9000');
});

users = [];
connections =[];

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);
	
	// Disconnect
	socket.on('disconnect', function(data) {
		//if(!socket.username) return;
		users.splice(users.indexOf(socket.username), 1);
		updateUsernames();
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets connected', connections.length);	
	});
	
	//Send Message
	socket.on('send message', function(data){
		io.sockets.emit('new message', {msg: data, user: socket.username});
	});
	
	// New User
	socket.on('new-user', function(data, callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
		console.log(users);
	});
	
	function updateUsernames(){
		io.sockets.emit('get-users', users);
	}
});

