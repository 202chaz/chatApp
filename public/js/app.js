var app = angular.module("chatApp", []);

app.controller("chatCtrl", function($scope, socket) {
  $scope.hideMe = false;
  $scope.getName = function(users){
    var day = new Date;
    var id = day.getTime();

    $scope.hideMe = true;
    $('#name').val(' ');
	
    // Pushes data to server
    socket.emit('new-user', users.toString());
    
  }
  
  socket.on('get-users', function(user) {
  
	for(i = 0; i < user.length; i++){
		$('#user-list').append('<li>'+user[i]+'</li>');
	}
  });
  
});