var app = angular.module("chatApp", []);

app.controller("chatCtrl", function($scope, socket) {
  $scope.hideMe = false;
  
  $scope.getName = function(users){
    var day = new Date;
    var id = day.getTime();
    // Pushes data to server
    socket.emit('new-user', users.toString(), function(data) {
      if(data) {
        //console.log(data);
      }
    }); 
    $('#name').val(' ');
    $scope.hideMe = true;   
  }
  
  socket.on('get-users', function(user) {
    var html = '';
  	for(i = 0; i < user.length; i++){
  		html += '<li>'+user[i]+'</li>';
  	}
    $('#user-list').html(html);
  });
  
  
  $scope.getMessage = function(data) {
    console.log(data);
    socket.emit('send-message', data);
    $('#message').val('');
  }
  socket.on('new-message', function(data) {
    $('#chat').append('<div class="chatMessage">'+data.msg+'</div>');
  });
  
});